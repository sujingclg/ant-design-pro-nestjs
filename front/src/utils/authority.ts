import defaultSettings from "@/defaultSettings";
import {reloadAuthorized} from "./Authorized";

export const authorityKey = `${defaultSettings.title}-authority`;

/**
 * 获取权限对应的角色列表, 如果有传入则将其作为一个角色返回, 否则返回 localStorage 中存储的角色列表
 * @param str
 */
export function getAuthority(str?: string): string[] {
  const authorityString = typeof str === 'undefined' ? localStorage.getItem(authorityKey) : str;
  if (!authorityString) {
    return [];
  }
  let authority;
  try {
    authority = JSON.parse(authorityString);  // 当 authorityString 为 JSON 字符串时, 解析后赋值给 authority
  } catch (e) {
    authority = authorityString;  // 否则说明 authorityString 为字符串列表或字符串列表, 直接赋值给 authority
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

/**
 * 将传入的角色(列表)设置到浏览器的 localStorage 中
 * @param authority 穿入的权限如果是字符串, 将其转换为列表后存入客户端
 */
export function setAuthority(authority?: string | string[]): void {
  const authorityArray = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem(authorityKey, JSON.stringify(authorityArray));
  // TODO 此函数的放置位置? 原来在 login.ts 中
  // reloadAuthorized();
}
