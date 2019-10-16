let CURRENT_USER_AUTHORITY: string | string[] = "NULL";
type CurrentUserAuthorityType = string | string[] | (() => typeof CURRENT_USER_AUTHORITY);

type renderAuthorizeType = <T>(Authorized: T) => ((currentUserAuthority: CurrentUserAuthorityType) => T);

/**
 * 此为高阶组件, 包装了 Authorized 组件, 并对其进行了一些预处理
 * 此方法需要传入一个用于鉴权的 React 组件, 并返回一个可调用对象,
 * 返回的可调研对象在调用时需要传入当前用户的权限信息, 内部将此信息赋值给 CURRENT_USER_AUTHORITY 变量,
 * 随后直接返回传入的鉴权 React 组件
 *
 * 此函数在index.ts中调用, 传入 ./Authorized.tsx 中的鉴权 React 组件,
 * 返回的可调研对象在 utils/Authorized.tsx 中传入当前用户信息后, 供 pages/Authorized.tsx 使用,
 * 而获取到的 CURRENT_USER_AUTHORITY 在 ./Authorized.tsx 中用于鉴权
 * @param Authorized 用于鉴权的React组件
 */
const renderAuthorize: renderAuthorizeType = function <T>(Authorized: T) {
  return (currentUserAuthority: CurrentUserAuthorityType) => {
    if (currentUserAuthority) {
      CURRENT_USER_AUTHORITY = currentUserAuthority as string[];
    }
    return Authorized;
  };
};

export {CURRENT_USER_AUTHORITY};
export default renderAuthorize;
