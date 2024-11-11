export default [
  {
    path: '/login',
    layout: false,
    component: './Login',
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '客服',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/admin',
        component: './admin/index/index',
        name: '客服',
      },
      {
        path: '/admin/:id',
        component: './admin/show/index',
        name: '详情',
      },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
