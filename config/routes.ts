﻿export default [
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
          {
            path: '/auto/message/:id/edit',
            name: '编辑',
            component: './auto/message/edit/index',
          },
        ],
      },
      {
        path: 'rule',
        name: '自定义规则设置',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/auto/rule',
            name: '消息列表',
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
        name: '系统规则设置',
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
