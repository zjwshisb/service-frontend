﻿export default [
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
            component: './auto/message/add',
          },
          {
            path: '/auto/message/:id/edit',
            name: '编辑',
            component: './auto/message/edit',
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
    path: '/transfer',
    component: './transfer',
    name: '转接记录',
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
    name: '客服面板',
    layout: false,
    target: '_blank',
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
