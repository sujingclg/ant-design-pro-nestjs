import React from "react";
import {BreadcrumbProps as AntdBreadcrumbProps} from "antd/es/breadcrumb";
import Link from "umi/link";
import {formatMessage} from "umi-plugin-react/locale"
import pathToRegexp from "path-to-regexp"
import {BreadcrumbNameMapType, MenuDataItemType} from "../typings";
import defaultSettings from "@/defaultSettings";
import {urlToList} from "./pathTools";


const {menu}  = defaultSettings;

export interface CustomBreadcrumbProps {
  location?: {pathname: string};
  breadcrumbNameMap?: BreadcrumbNameMapType;
}

/**
 * 在非hash模式history时重定义面包屑链接, hash可不使用此函数, 使用默认的即可
 * @param route
 * @param params
 * @param routes
 * @param paths
 */
const itemRender: AntdBreadcrumbProps['itemRender'] = (route, params, routes, paths) => {
  const isLastRoute = routes.indexOf(route) == routes.length - 1;
  // 如果当前传入的route是'/', 则设置为可点击链接
  if (route.path == '/') {
    return <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
  }
  // 避免设置最后一个route和没有component的route为可点击链接
  // console.log(route);
  // @ts-ignore
  return isLastRoute || !route.component ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
  );
};

/**
 * 根据defaultSettings的设置, 将面包屑中的各个节点翻译为对应的语言
 * @param item
 */
function renderItemLocal(item: MenuDataItemType): string {
  if (item.locale) {
    return menu.locale
      ? formatMessage({id: item.locale, defaultMessage: item.name})
      : item.name;
  }
  return item.name;
}

/**
 * 根据 Dva 的 menu model 中生成的 path-MenuDataItemType 映射表和 url 获取其对应的MenuDataItem
 * @param breadcrumbNameMap: Dva 的 menu model 中生成的 path-MenuDataItemType 映射表
 * @param url
 */
function getMenuDataItem(breadcrumbNameMap: BreadcrumbNameMapType, url: string): MenuDataItemType {
  if (!breadcrumbNameMap) {
    return {path: '', name: ''};
  }
  let menuDataItem = breadcrumbNameMap[url];
  if (!menuDataItem) {
    Object.keys(breadcrumbNameMap).forEach(item=>{
      if (pathToRegexp(item).test(url)) {
        menuDataItem = breadcrumbNameMap[item];
      }
    });
  }
  return menuDataItem
}

/**
 * 将当前页面的 url 转换为面包屑组件的 routes 属性
 * @param routerLocation: React-Router 传入的 location 属性, 其中包含记录当前路径的 pathname 属性
 * @param breadcrumbNameMap: Dva 的 menu model 中生成的 path-MenuDataItemType 映射表
 */
function conversionFromLocation(
  routerLocation: CustomBreadcrumbProps['location'] = {pathname: '/'},
  breadcrumbNameMap: BreadcrumbNameMapType,
  ): AntdBreadcrumbProps['routes'] {
  if (!routerLocation) {
    return []
  }
  // 将当前页面的路径转换为层级目录的列表
  const pathSnippets = urlToList(routerLocation.pathname);
  const breadcrumbRoutes: AntdBreadcrumbProps['routes']= pathSnippets.map(url => {
    const currentMenuDataItem = getMenuDataItem(breadcrumbNameMap, url);
    if (!currentMenuDataItem || currentMenuDataItem.inherited) {
      return {path: '', breadcrumbName: ''}
    }
    const name = renderItemLocal(currentMenuDataItem);
    return name && !currentMenuDataItem.hideInBreadcrumb
      ? {path: url, breadcrumbName: name}
      : {path: '', breadcrumbName: ''}
  }).filter(item => Boolean(item && item.path));
  return breadcrumbRoutes;
}

/**
 * 用于生成 antd 的 Breadcrumb 组件的参数, 返回的对象包括其全部或部分属性值,
 * 可将此返回值直接传入 PageHeader 组件的 breadcrumb 属性,
 * 或者使用对象解构语法传入 Breadcrumb 组件
 */
export default function getBreadcrumbProps(props: CustomBreadcrumbProps): AntdBreadcrumbProps {
  const {location, breadcrumbNameMap} = props;
  if (!location || !breadcrumbNameMap) {
    return {};
  }
  const routes = conversionFromLocation(location, breadcrumbNameMap);
  if (routes && routes.length > 0) {
    routes.unshift({
      path: '/',
      breadcrumbName: formatMessage({id: 'menu.home', defaultMessage: 'Home'}),
    });
  }
  return {
    routes,
    itemRender,
  }
}