import React from 'react';
import Redirect from 'umi/redirect';
import {connect} from 'dva';
import pathToRegexp from 'path-to-regexp';
import {Route, UserModelState, ConnectProps, ConnectState} from '@/models/connect';
import Authorized from './Authorized';
import {getAuthority} from '@/utils/authority';
// import Exception403 from "../pages/Exception/403";

/**
 * 遍历 routeData 中的各个 route 节点, 寻找其属性匹配传入的 path 的 route 节点, 如找到则返回其 authority 属性(如果有的话).
 * 如果不存在这样的节点但存在能匹配 path 的某个父路径的节点, 则返回此此节点的 authority 属性(如果有的话).
 * 如果存在能完全匹配 path 的 route 节点, 但其中未定义 authority 属性, 则返回其父路径中距离最近且有权限的路由的 authority 属性.
 * 否则返回 undefined, 表示当前路由没有设置权限
 * @param path
 * @param routeData: 由 umi 从 config 文件的 routes 属性传入
 */
function getRouteAuthority(path: string, routeData: Route[]) {
  let authorities: string[] | string | undefined;  // route中定义的authorities可能是字符串也可能是数组, 未定义表示当前路由没有设置权限
  routeData.forEach(route => {
    // 判断传入的path是否匹配当前递归到的route的path属性, 如是, 获取递归到的route中的属性, 覆盖之前的
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // authorities被赋值为当前route节点的authority属性或者undefined
      authorities = route.authority || authorities;
      if (route.routes) {
        // 递归查找子路径, 将其返回值或者当前route节点的authority属性赋给authorities
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
}

function mapStateToProps(state: ConnectState) {
  return {
    user: state.user,
  };
}

interface AuthorizeProps extends ConnectProps {
  user: UserModelState;
}
const Authorize: React.FC<AuthorizeProps> = (props => {
  const {
    children,
    route = {
      routes: [],
    },
    location,
    // user: {currentUser}, // 未注册时currentUser为未定义
  } = props;
  // TODO 目前的权限保存在 localStorage 中, 为来考虑在 Redux 的 login 中获取登陆状态
  const isLogin = getAuthority().length;
  const {routes = []} = route;

  // 当前用户的角色如果与路由中定义的角色不匹配时, children渲染出的将是noMatch的内容, 否则正常渲染
  return (
    <Authorized
      routeAuthority={getRouteAuthority(location!.pathname, routes)}
      noMatch={isLogin ? <Redirect to='/exception/403'/> : <Redirect to='/user/login'/>}
      // noMatch={isLogin ? <Exception403/> : <Redirect to="/user/login"/>}
    >
      {children}
    </Authorized>
  );
});

export default connect(mapStateToProps)(Authorize);
