import React from "react";
import checkPermissions, {RouteAuthorityType, check} from "./checkPermissions";
import {CURRENT_USER_AUTHORITY} from "./renderAuthorize";

interface AuthorizedProps {
  routeAuthority: RouteAuthorityType;
  noMatch?: React.ReactNode;
}

/**
 * 此 React 组件为一个路由权限渲染器, 各个路由的权限在 config 文件中定义
 * 如果当前用户的权限与路由指定的权限不匹配, 则跳转到传入的 noMatch 组件
 * 当前用户的权限在从 CURRENT_USER_AUTHORITY 常量获取
 */
export default class Authorized extends React.Component<AuthorizedProps, {}> {
  readonly state: Readonly<{}>;
  static check: typeof check;

  constructor(props: AuthorizedProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      children,
      routeAuthority,
      noMatch = null,
    } = this.props;
    const childrenRender: React.ReactNode = typeof children === "undefined" ? null : children;
    const dom = checkPermissions(routeAuthority, CURRENT_USER_AUTHORITY, childrenRender, noMatch);
    return <>{dom}</>;
  }
}
