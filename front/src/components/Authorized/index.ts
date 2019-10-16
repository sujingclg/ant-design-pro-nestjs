import Authorized from "./Authorized";
import renderAuthorize from "./renderAuthorize";
import {check} from "./checkPermissions";

Authorized.check = check;

/**
 * AuthorizeRenderer 返回一个函数, 调用这个函数并传入当前用户的权限, 将返回一个路由权限渲染器,
 * 即 Authorize.tsx 中定义的, 未作任何状态改动的 Authorized 组件,
 * 同时传入的用户权限将被赋值给 renderAuthorize.ts 中定义的 CURRENT_USER_AUTHORITY 常量
 */
const AuthorizeRenderer = renderAuthorize(Authorized);

export default AuthorizeRenderer;
