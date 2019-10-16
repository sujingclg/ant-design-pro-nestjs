import axios from '@/utils/axios';

/**
 * type 用于区分使用了哪种登陆方式, account 为账号密码登陆, mobile 为手机验证码登陆.
 * 因此 login 下层需要两个路由, 分别为 /api/login/account 和 /api/login/mobile.
 * 目前只实现了 /api/login/account 路由
 * @param params:
 */
export async function fakeAccountLogin(params: {type: 'account'|'mobile', [key: string]: string}) {
  const response = await axios.post('/api/user/access/login', params);
  return new Promise(resolve => {
    resolve(response.data);
  });
}

/**
 * response 中必须包含 token 和 currentAuthority
 * @param params
 */
export async function userLogin(params: {loginType: 'account'|'mobile', [key: string]: string}) {
  const {loginType, username, password} = params;
  // console.log(params);
  if (loginType === 'account') {
    try {
      // const response = await axios.post('/api/user/access/login', {username, password});
      const response = await axios.get('/api/user/access/login', {params: {username, password}});
      response.data.loginType = 'account';
      response.data.status = 'ok';
      return response.data;
    } catch (e) {
      console.log('login field');
      return {status: 'error', loginType: 'account', currentAuthority: 'guest'};
    }
  }
}

export async function getFakeCaptcha(mobile: string) {
  console.log(mobile);
  return;
}

export async function queryNotices() {
  const response = await axios.get('/api/user/access/notices');
  return response.data;
}
