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
    path: '/',
    component: './dashboard',
    name: 'dashboard',
  },
  {
    path: '/auto',
    name: '自动回复',
    routes: [
      {
        path: 'message',
        name: '快捷回复',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/auto/message',
            name: '快捷回复',
            component: './auto/message/index',
          },
          {
            path: '/auto/message/add',
            name: '新增',
            component: './auto/message/add/index',
          },
          {
            path: '/auto/message/:id/edit',
            name: '编辑',
            component: './auto/message/edit/index',
          },
        ],
      },
      {
        path: 'rule',
        name: '自定义规则',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/auto/rule',
            name: '自定义规则',
            component: './auto/rule/index',
          },
          {
            path: '/auto/rule/add',
            name: '新增',
            component: './auto/rule/add/index',
          },
          {
            path: '/auto/rule/:id/edit',
            name: '编辑',
            component: './auto/rule/edit/index',
          },
        ],
      },
      {
        path: 'system-rule',
        name: '系统规则',
        hideChildrenInMenu: true,
        component: './auto/system-rule/index',
      },
    ],
  },
  {
    path: '/setting',
    component: './setting',
    name: '系统设置',
  },
  {
    path: '/session',
    name: '会话记录',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/session',
        name: '会话记录',
        component: './session/list/index',
      },
      {
        path: '/session/:id',
        name: '会话详情',
        component: './session/detail/index',
      },
    ],
  },
  {
    path: '/chat',
    component: './chat/index',
    layout: false,
  },
  {
    path: '/404',
    component: './404',
  },
  {
    path: '*',
    redirect: '/404',
  },
];
