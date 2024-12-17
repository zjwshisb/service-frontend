import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={'2025'}
      links={[
        {
          key: 'github',
          title: (
            <div>
              <GithubOutlined />
              <span className={'ml-1'}>go-chat-service</span>
            </div>
          ),
          href: 'https://github.com/zjwshisb/go-chat-service',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
