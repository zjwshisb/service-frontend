export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
    ],
  },
  {
    path: '/dashboard',
    component: './dashboard',
    name: 'dashboard',
  },
  {
    path: '/auto',
    name: '自动回复',
    routes: [
      {
        path: 'message',
        name: '消息列表',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/auto/message',
            name: '消息列表',
            component: './auto/message/index',
          },
          {
            path: '/auto/message/add',
            name: '新增',
            component: './auto/message/add/index',
          },
        ],
      },
      {
        path: 'rule',
        name: '规则设置',
        component: './auto/rule/index',
      },
    ],
  },
  {
    path: '/setting',
    component: './setting',
    name: '系统设置',
  },
  {
    path: '/message',
    name: '消息记录',
    component: './message/index',
  },
  {
    path: '/chat',
    component: './chat/index',
    layout: false,
  },
];
