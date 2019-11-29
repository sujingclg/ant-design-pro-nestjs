import memoizeOne from "memoize-one";
import isEqual from "lodash/isEqual";
import {Reducer} from "redux";
import {formatMessage} from "umi-plugin-react/locale";
import {Effect} from "./connect";
import Authorized from "@/utils/Authorized";
import {MenuDataItemType, Route, BreadcrumbNameMapType} from "@/components/typings";
import defaultSettings from "@/defaultSettings";

const {check} = Authorized;

/**
 * 根据 defaultSettings 中的设置是否使用国际化菜单, 将 config/config.ts 中定义的 routes 属性转化为各个拓扑菜单结构
 * @param routeData: routeData, 由 umi/router 负责传入 layout 组件
 * @param parentName: 父节点的名词, 即路径中该父节点的标识, 示例: /{rootPath}/parentName/childName
 * @param parentAuthority
 */
function formatter(routeData: Route[], parentAuthority?: string[] | string, parentName?: string): MenuDataItemType[] {
  if (!routeData) { return []; }
  return routeData.map(item => {
    if (!item.name || !item.path) { return null; }
    let locale: any = "menu";
    if (parentName && parentName !== "/") {
      locale = `${parentName}.${item.name}`;  // 递归调用时将进行串联, 从而形成一个以'/'分隔的路径
    } else {
      locale = `menu.${item.name}`;  // 专门为Home页执行
    }
    const name = defaultSettings.menu.locale
      ? formatMessage({id: locale, defaultMessage: item.name})
      : item.name;
    const result: Route = {
      ...item,
      name,
      locale,
      authority: item.authority || parentAuthority,  // 使得每个菜单子节点都有authority, 或是自身的, 或是从父节点继承而来的
    };
    if (item.routes) { // 如果item有子路由, 则递归调用.
      const children = formatter(item.routes, item.authority, locale);
      result.children = children as MenuDataItemType[];
      delete result.routes;  // 注意传入的是routeData, 返回menuData没有routes属性
    }
    return result as MenuDataItemType;
  }).filter(item => item) as MenuDataItemType[];  // 过滤掉因没有 name 或 path 而返回 null 的 item
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * 获取获取某个菜单项的子菜单或子节点
 * @param item: 传入的菜单项
 */
function getSubMenu(item: MenuDataItemType): MenuDataItemType {
  if (
    item.children &&  // item有children属性
    !item.hideChildrenInMenu &&  // item没有设置hideChildrenInMenu为true
    item.children.some(child => child.name)  // 子菜单列表中的各个菜单项中至少有一个菜单项有 name 属性
  ) {
    return {
      ...item,
      children: filterMenuData(item.children),
    };
  }
  return item;  // 说明传入的 item 是一个菜单叶节点, 直接返回
}

/**
 * 根据当前用户的权限和各个菜单项的权限过滤出当前层级中匹配的菜单节点
 * 注意此函数不检查子菜单项的权限, 因此若需检查子菜单项的, 须在其他递归函数中重复调用此函数
 * @param menuData
 */
function filterMenuData(menuData: MenuDataItemType[]): MenuDataItemType[] {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => check(item.authority, getSubMenu(item), undefined) as MenuDataItemType)
    .filter(item => item);
}

/**
 * 获取面包屑映射
 * @param menuData: 菜单配置
 */
function getBreadcrumbNameMap(menuData: MenuDataItemType[]): BreadcrumbNameMapType {
  if (!menuData) { return {}; }
  const routerMap: { [flatMenuKey: string]: MenuDataItemType } = {};

  const flattenMenuData = (data: MenuDataItemType[]) => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      routerMap[menuItem.path] = menuItem;
    });
  };

  flattenMenuData(menuData);
  return routerMap;
}

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export interface MenuModelState {
  menuData: MenuDataItemType[];
  routeData: Route[];
  breadcrumbNameMap: BreadcrumbNameMapType;
}

interface MenuModelType {
  namespace: "menu";
  state: MenuModelState;
  effects: {
    getMenuData: Effect;
  };
  reducers: {
    save: Reducer<MenuModelState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: "menu",

  state: {
    menuData: [],
    routeData: [],
    breadcrumbNameMap: {},
  },

  effects: {
    * getMenuData({payload}, {put}) {
      const {routes, authority, path} = payload;
      const originalMenuData = memoizeOneFormatter(routes, authority, path);
      const menuData = filterMenuData(originalMenuData);
      // 因为 filterMenuData 会过滤掉没有名字和设置为隐藏的菜单项, 以及权限不匹配的菜单项, 这会丢失 Login 的信息,
      // 而 breadcrumbNameMap 除了用于生成面包屑, 还用于生成 page title, 因此此处需传入 originalMenuData
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
      yield put({
        type: "save",
        payload: {menuData, breadcrumbNameMap, routeData: routes},
      });
    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default MenuModel;
