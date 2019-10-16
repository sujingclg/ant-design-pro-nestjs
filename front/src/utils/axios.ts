import axios from 'axios';
import router from 'umi/router';
import defaultSettings from '@/defaultSettings';
import {authorityKey} from './authority';

const authorityToken = `${defaultSettings.title}-token`;

const instance = axios.create({
  // baseURL: 'http://localhost:7001',
  timeout: 5000,
});

instance.interceptors.request.use(config => {
  if (config.url && config.url.indexOf('/api/user/access/login') === -1) {
    // config.auth = {username: localStorage.getItem(authorityToken) || '', password: ''};
    config.headers.Authorization = `Bearer ${localStorage.getItem(authorityToken)}`;
  }
  return config;
}, error => {
  // console.log('request field');
  return Promise.reject(error);
});

instance.interceptors.response.use(
  response => {
    if (response.config.url && response.config.url.indexOf('/api/user/access/login') !== -1) {
      // console.log('get token success');
      // console.log(response.data.token);
      localStorage.setItem(authorityToken, response.data.token);
    }
    return response;
  }, error => {
    // console.log('response field');
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // console.log('401 error');
          localStorage.removeItem(authorityToken);
          localStorage.removeItem(authorityKey);
          router.push('/user/login');
          break;
      }
    }
    return Promise.reject(error.response.data);
  },
);

// export default instance;
export default axios;
