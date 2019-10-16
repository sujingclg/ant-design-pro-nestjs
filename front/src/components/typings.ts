import {
  RouteComponentProps as BasicRouteProps,
  RouteProps,
  match,
} from "react-router-dom";

export interface MenuDataItemType {
  path: string;  // 菜单项对应的前端路由路径
  name: string;  // 显示在网页上的菜单名
  icon?: string;  // 菜单项图标
  children?: MenuDataItemType[];
  target?: "_blank" | "_self" | "_parent" | "_top";  // 如果path是一个指向外部的连接, 则target为a标签的target属性, 以何种方式打开
  authority?: string[] | string;  // 菜单项的权限, 与路由权限对应
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
  locale?: string;  // 国际化的id号
  inherited?: boolean;  // 面包屑中使用, 用途不详
  hideInBreadcrumb?: boolean;  // 面包屑中使用, 用途不详
  [key: string]: any;
}

export interface Route extends MenuDataItemType {
  routes: Route[];
}

export type WithFalse<T> = T | false;

type IncludeRoute = "component" | "exact" | "path";

type RouteType = Pick<RouteProps, IncludeRoute>;

export interface RouterTypes<T extends Record<string, any> = {}, P = {}> extends BasicRouteProps {
  computedMatch?: match<P>;
  route?: RouteType & T;
}

export interface MessageDescriptor {
  id: any;
  description?: string;
  defaultMessage?: string;
}

export interface BreadcrumbNameMapType {[path: string]: MenuDataItemType;}

export interface CurrentUserType {
  username: string;
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  geographic?: any;
  tags?: Array<{
    key: string;
    label: string;
  }>;
  unreadCount?: number;  // 未读消息数
}
