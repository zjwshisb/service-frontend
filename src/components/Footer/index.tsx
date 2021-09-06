import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="zjwshisb"
    links={[
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/zjwshisb/go-chat-service',
        blankTarget: true,
      },
    ]}
  />
);
