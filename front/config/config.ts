import pageRoutes from "./router.config";

export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      // dynamicImport: true,
      locale: {
        enable: true,
        default: 'zh-CN',
        baseNavigator: true,
      }
    }],
  ],
  // base: '../antd-ACAE2/dist/',
  publicPath: "/",
  // history: 'hash',

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
    }
  },

  // devServer: {
  //   proxyTable: {
  //     '/api': {
  //       target: 'http://127.0.0.1:5000',
  //       changeOrigin: true,
  //     }
  //   }
  // },

  routes: pageRoutes,

  theme: {
    "@primary-color": "#1DA57A"
  },

  disableRedirectHoist: true, //禁用 redirect 上提
}
