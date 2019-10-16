import React from "react";
import {Menu, Icon} from "antd";
import {MenuMode, MenuProps} from "antd/lib/menu";
import Link from "umi/link";
import {Settings} from "@/defaultSettings"
import {isUrl} from "../utils/utils"
import {getFlatMenuKeys, getMenuMatches} from "./SiderMenuUtils";
import {urlToList} from "../utils/pathTools";

import {
  MenuDataItemType,
  RouterTypes,
  Route,
} from "../typings";


const {SubMenu} = Menu;

function getIcon(icon?: string | React.ReactNode): React.ReactNode {
  if (typeof icon == 'string') {
    // 如果传入的icon是一个链接, 返回img标签
    if (isUrl(icon)) {
      return <img src={icon} alt="icon" style={{width: '14px', marginRight: '10px'}}/>;
    }
    // 如果icon仅仅是一个字符串, 则说明其实本地资源, 返回 antd 的 Icon 图标元素
    else {
      return <Icon type={icon}/>
    }
  }
  // 否则 icon 本身就是一个图标元素, 直接返回此 react 元素
  return icon;
}


export interface BaseMenuProps
  extends
    Partial<RouterTypes<Route>>, // 此原型中有location, 来源于react-router
    Partial<Settings> {
  mode?: MenuMode;  // 默认inline
  theme?: MenuProps['theme'];  // 默认dark
  className?: string;
  collapsed?: boolean;  // 侧边菜单是否处于收起状态
  onCollapse?: (collapsed: boolean) => void;  // 侧边菜单收起时的回调
  isMobile?: boolean;
  onOpenChange?: (openKeys: string[]) => void;
  openKeys?: string[];
  menuData: MenuDataItemType[];
  isForgetHistory?: boolean;
  // formatMessage?: (message: MessageDescriptor) => string;
}

class BaseMenu extends React.Component<BaseMenuProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: BaseMenuProps) {
    super(props);
    this.state = {};
  }

  /**
   * 先调用 getFlatMenuKeys 将 menuData 扁平化为路径字符串列表,
   * 之后根据 react-router 传入的当前路径 pathname 获取到路径字符串列表中匹配的 flatMenuKey
   * 当前路径可能匹配多个 flatMenuKey, 将其作为字符串列表返回
   */
  getSelectedMenuKeys: (() => string[]) = () => {
    const {pathname} = this.props.location!;
    const flatMenuKeys = getFlatMenuKeys(this.props.menuData);
    // pop 弹出最底层路径, 即最深的路径, 匹配示例见 ./PartialSiderMenuUtils.ts 中的 getDefaultCollapsedSubMenus 函数注释
    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop()) as string[];
  };

  conversionPath: (path: string) => string = path => {
    // 如果是超链接则直接返回
    if (path && path.indexOf('http') == 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');  // 将path中全部的双斜杠 '//' 替换为单斜杠 '/'
    }
  };

  // /**
  //  * 获取国际化的菜单名
  //  */
  // getIntlName(item: MenuDataItemType): string {
  //   const {name, locale} = item;
  //   const {
  //     menu = {locale: false},
  //     formatMessage,
  //   } = this.props;
  //   if (locale && menu.locale && formatMessage) {
  //     return formatMessage({
  //       id: locale,
  //       defaultMessage: name,
  //     });
  //   }
  //   return name;
  // }

  /**
   * 此方法主要是构建链接节点, 包括 a 标签和 Link 元素
   * 判断是否是 http 链接.返回 Link 或 a
   * @param item
   */
  getMenuItemPath: (item: MenuDataItemType) => React.ReactNode = (item) => {
    const itemPath = this.conversionPath(item.path);
    // 当 icon 为 undefined 时不会被渲染
    const icon = getIcon(item.icon);
    const {target} = item;
    const name = item.name;
    // 判断 itemPath 是否是一个 http 链接
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    // replace设置为true时, 重复点击时导航不留历史记录, 否则点击浏览器后退时会在同一个页面
    const replace: boolean = this.props.isForgetHistory || itemPath == this.props.location!.pathname;
    // const replace = itemPath == this.props.location.pathname;
    return (
      <Link to={itemPath} replace={replace}>
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  /**
   * 传入 menusData 的一级菜单项, 获取其子菜单并渲染
   * 此方法与 getNavMenuItems 方法递归调用以遍历整个 menusData, 返回的是 SubMenu 或者 Menu.Item 组件
   * @param item
   */
  getSubMenuOrItem: (item: MenuDataItemType) => React.ReactNode = (item) => {
    // 当传入的一级菜单有子菜单且子菜单有 name 属性时, 将其设置为可展开菜单, 否则设置为可选择菜单
    if (
      Array.isArray(item.children) &&
      !item.hideChildrenInMenu &&
      item.children.some(child => typeof child.name != 'undefined')
    // item.children.some(child =>  !!child.name)  与上一句同理, 检测name属性是否定义
    ) {
      const childrenItems = this.getNavMenuItems(item.children);
      const name = item.name;
      // 当无子菜单时就不展示菜单
      // if (childrenItems && childrenItems.length > 0) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                  {/*如果菜单项有图标属性则设置对应的图标, 否则只有文本*/}
                {getIcon(item.icon)}
                <span>{name}</span>
                </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
          {childrenItems}
        </SubMenu>
      );
    } else {
      // 设置为可选择菜单, 并设置跳转链接( Link 元素或 a 标签 )
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
    }
  };

  /**
   * 获得传入菜单对象列表的菜单节点
   * @param menuData
   */
  getNavMenuItems: (menuData: MenuDataItemType[]) => React.ReactNode[] = (menuData = []) => {
    // 从传入的 menusData 中过滤出有 name 属性且没有 hideInMenu 属性的项
    return menuData.filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item); //过滤出不是空对象的菜单节点.
  };

  render() {

    const {
      openKeys,
      theme = 'dark',
      mode = 'inline',
      className,
      collapsed,
      onOpenChange,
        // style,
        // fixedHeader=flase,
        // layout='sidemenu',
      menuData
    } = this.props;

    // 在当前路径不匹配任何菜单路径时, 使用最接近当前路径的父路径
    // 结合 getSelectedMenuKeys, handleOpenChange, 对selectedKeys做了如下处理:
    // 如果根据当前路由信息找不到匹配的菜单项，则当前选中的菜单项为将要打开的菜单项.
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }

    // 在 collapsed 为 true 时全部收起导航菜单, 否则将Menu组件的openKeys设置为openKeys
    let props = {};
    if (openKeys && !collapsed && mode != 'horizontal') {
      props = {
        openKeys: openKeys.length == 0 ? [...selectedKeys] : openKeys,
      };
    }

    return (
      <Menu
        {...props}
        theme={theme}
        mode={mode}
        className={className}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
      >
        {this.getNavMenuItems(menuData)}
      </Menu>
    );
  }
}

export default BaseMenu;