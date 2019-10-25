import React, {Fragment} from 'react';
import renderAuthorize, {CURRENT_USER_AUTHORITY} from './renderAuthorize';
import checkPermissions, {check, RouteAuthorityType} from './checkPermissions';

/**
 * 此 React 组件为一个路由权限渲染器, 各个路由的权限在 config 文件中定义
 * 如果当前用户的权限与路由指定的权限不匹配, 则跳转到传入的 noMatch 组件
 * 当前用户的权限在从 CURRENT_USER_AUTHORITY 常量获取
 */
interface AuthorizedProps {
  routeAuthority: RouteAuthorityType;
  noMatch: React.ReactNode;
}

const Authorized: React.FC<AuthorizedProps> & { check: typeof check } = (
  {
    children,
    routeAuthority,
    noMatch = null
  }) => {
  const childrenRender: React.ReactNode = typeof children === "undefined" ? null : children;
  const dom = checkPermissions(routeAuthority, CURRENT_USER_AUTHORITY, childrenRender, noMatch);
  return <Fragment>{dom}</Fragment>;
};

Authorized.check = check;

/**
 * AuthorizeRenderer 返回一个函数, 调用这个函数并传入当前用户的权限, 将返回一个路由权限渲染器,
 * 即 Authorize.tsx 中定义的, 未作任何状态改动的 Authorized 组件,
 * 同时传入的用户权限将被赋值给 renderAuthorize.ts 中定义的 CURRENT_USER_AUTHORITY 常量
 */
const AuthorizeRenderer = renderAuthorize(Authorized);

export default AuthorizeRenderer;
