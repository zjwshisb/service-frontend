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
    path: '/rule',
    component: './rule',
    name: '自动回复',
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
