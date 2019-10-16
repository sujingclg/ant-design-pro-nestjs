import React from 'react';
import {CURRENT_USER_AUTHORITY} from './renderAuthorize';

export type RouteAuthorityType =
  undefined
  | string
  | string[]
  | Promise<any>
  | ((currentAuthority: string | string[]) => RouteAuthorityType);

/**
 * 通用权限检查方法
 * 由于此函数为泛型函数, 返回的类型与传入的类型未定, 此处可认为返回React组件以便于理解
 * 此外, 此函数也可用于检查菜单的权限
 * Common check permissions method
 * @param routeAuthority { 路由的权限 | Permission judgment }
 * @param currentUserAuthority { 用户的权限 | Your permission description }
 * @param Target { 通过检查时返回的组件 | Passing component }
 * @param Exception { 未通过检查时返回的组件 | no pass component }
 */
export default function checkPermissions<T, E>(
  routeAuthority: RouteAuthorityType,
  currentUserAuthority: string | string[],
  Target: T,
  Exception: E,
): T | E | React.ReactNode {

  // console.log("routeAuthority", routeAuthority);
  // console.log("currentUserAuthority", currentUserAuthority);

  // 当传入的componentAuthority是undefined时执行以下语句
  if (!routeAuthority) { return Target; }  // 对于没有设置权限的组件, 默认直接返回

  // 当传入的componentAuthority是权限数组时执行以下语句
  if (Array.isArray(routeAuthority)) {
    if (Array.isArray(currentUserAuthority)) {
      if (currentUserAuthority.some(item => routeAuthority.includes(item))) {
        return Target;  // 当authority和currentAuthority都是数组且某个元素同时出现在两者之中时, 返回targetComponent
      }
    } else if (routeAuthority.includes(currentUserAuthority)) {
      return Target;
    }
    return Exception;
  }

  // 当传入的componentAuthority是单个权限时执行以下语句
  if (typeof routeAuthority === 'string') {
    if (Array.isArray(currentUserAuthority)) {
      if (currentUserAuthority.some(item => routeAuthority.includes(item))) {
        return Target;  // 当authority和currentAuthority都是数组且某个元素同时出现在两者之中时, 返回targetComponent
      }
    } else if (routeAuthority === currentUserAuthority) {
      return Target;
    }
    return Exception;
  }

  // TODO 当传入的componentAuthority是Promise对象时执行以下语句
  if (routeAuthority instanceof Promise) {}

  // TODO 当传入的componentAuthority是Function对象时执行以下语句
  if (typeof routeAuthority === 'function') {}

  throw new Error('unsupported parameters');
}

export function check<T, K>(
  routeAuthority: RouteAuthorityType,
  Target: T,
  Exception: K): T | K | React.ReactNode {
  return checkPermissions(routeAuthority, CURRENT_USER_AUTHORITY, Target, Exception);
}
