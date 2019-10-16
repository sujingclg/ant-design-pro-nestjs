/**
 * 实际上这里定义的所有属性都能在props中和props.children.props中的route属性中访问到
 * umi会对component, Routes, routes属性做特别处理
 * react-router处理路由的顺序为从顶层路由进入, 层层深入到底层路由, 因此对顶层路由的权限控制将自动应用到其下的各级路由中
 * Routes属性用于配置路由验证器, 其底层的路由在构建其对应的component前都会先传入验证器中
 * 权限路由的控制逻辑为从含有Routes属性的路由进入到权限验证组件中, 如果权限符合就返回对应子路由的内容, 否则跳转到登陆页
 * 因此authority属性必须在Route属性所在路由的子孙路由中配置才能生效
 */
export default [
  {
    path: "/user",
    component: "../layouts/UserLayout",
    routes: [
      { path: "./", redirect: "login" },
      { path: "login", name: "login", component: "./User/Login" },
      { path: "register", name: "register", component: "./User/Register" },
      { component: "404" },
    ],
  },
  {
    path: "/",
    component: "../layouts/BasicLayout",  // 此处的Layout承载了余下的路由任务
    Routes: ["src/utils/Authorize"],  // umi会依次遍历这个属性的列表, 将对应React组件传入其中, 通过props.children访问
    routes: [
      {
        path: "/",
        component: "./index.tsx",
        // redirect: "",
        authority: ["admin", "user"],
      },
      {
        path: "bulletin",
        name: "Bulletin",
        icon: "profile",
        component: "./Bulletin",
      },
      {
        path: "test-planner",
        name: "TestPlanner",
        icon: "schedule",
        routes: [
          {
            path: "./",
            redirect: "./overview",
          },
          {
            path: "./overview",
            name: "Overview",
            component: "./TestPlanner/Overview/index",
          },
          {
            path: "./create-task",
            name: "CreateTask",
            component: "./TestPlanner/CreateTask/index",
          },
          {
            path: "./task-profile",
            name: "TaskProfile",
            component: "./TestPlanner/TaskProfile/index",
          },
        ],
      },
      {
        path: "data-analysis",
        name: "DataAnalysis",
        icon: "solution",
        authority: ["admin"],
        routes: [
          {
            path: "./",
            redirect: "./page0",
          },
          {
            path: "./page0",
            name: "page0",
            component: "./DataAnalysis/page0",
          },
          {
            path: "./page1",
            name: "page1",
            component: "./DataAnalysis/page1",
          },
          {
            path: "./page2",
            name: "page2",
            component: "./DataAnalysis/page2",
          },
          {
            path: "./page3",
            name: "page3",
            component: "./DataAnalysis/page3",
          },
        ],
      },
      {
        path: "/account",
        name: "account",
        icon: "user",
        // hideInMenu: true,
        routes: [
          {
            path: "/account/center",
            name: "center",
            component: "./Account/Center/index",
            routes: [
              {
                path: "/account/center",
                redirect: "/account/center/articles",
              },
              {
                path: "/account/center/articles",
                component: "./Account/Center/Articles",
              },
            ],
          },
          {
            path: "/account/settings",
            name: "settings",
            component: "./Account/Settings/index",
          },
        ],
      },
      // {
      //   path: '/special-effects',
      //   name: 'SpecialEffects',
      //   icon: 'sketch',
      //   routes: [
      //     {
      //       path: './three-js',
      //       name: 'PeriodicTable',
      //       component: './SpecialEffects/PeriodicTable/PeriodicTable'
      //     }
      //   ],
      // },
      {
        path: "/exception",
        routes: [
          {
            path: "/exception/403",
            component: "./Exception/403",
          },
          {
            path: "/exception/404",
            component: "./Exception/404",
          },
          {
            path: "/exception/500",
            component: "./Exception/500",
          },
        ],
      },
      { component: "404" },
    ],
  },
];
