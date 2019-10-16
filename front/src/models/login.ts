import {Reducer} from 'redux';
import {routerRedux} from 'dva/router';
import {stringify, parse} from 'qs';
import {Effect} from './connect';
import {userLogin, fakeAccountLogin, getFakeCaptcha} from '@/services/api';
import {reloadAuthorized} from '@/utils/Authorized';
import {setAuthority} from '@/utils/authority';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

// TODO 目前的 Login 状态都存储于 localStorage 上, 考虑根据用户设置是否自动登陆, 将 localStorage 设置于 Redux 上
export interface LoginModelState {
  status?: 'ok' | 'error';
  loginType?: 'account' | 'mobile';
}

interface LoginModelType {
  namespace: 'login';
  state: LoginModelState;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<LoginModelState>;
  };
}

const LoginModel: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    * login(action, {call, put}) {
      if (action.payload.loginType === 'mobile') { return; }
      const response: {
        status: 'ok' | 'error', currentAuthority: string,
      } = yield call(fakeAccountLogin, action.payload);
      // console.log('response', response);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        let {redirect}: { redirect: string | null } = getPageQuery();
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {  // origin返回 "http://当前地址的域名或ip"
            redirect = redirect.substr(urlParams.origin.length);  // 截取制定长度以后的子字符串
            if (redirect.match(/^\/.*#/)) {  // 如果路径中包含井号, 设置 redirect 为井号以后的路径
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    * getCaptcha({payload}, {call}) {
      yield call(getFakeCaptcha, payload);
    },

    * logout(_, {call, put}) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: undefined,
          currentAuthority: [],
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            // 此处将目标url变成url查询参数, 添加到/user/login之后, 压入到react路由中
            // 使路由跳转到http://localhost:8000/user/login?redirect=http://localhost:8000/(目标路由)
            // 之后在成功登陆后, 在上面的login中重新解析此url查询参数, 并使路由跳转到目标url
            redirect: window.location.href,
          }),
        }),
      );
    },
  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        loginType: payload.loginType,
      };
    },
  },
};

export default LoginModel;
