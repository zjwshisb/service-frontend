import React from 'react';
import { UnorderedListOutlined } from '@ant-design/icons/lib';
import { Popover, List, App } from 'antd';
import { useModel, useRequest } from '@umijs/max';
import { createMsg } from '@/utils';
import { getAutoMessage } from '@/services/auto';

const Index = () => {
  const { data } = useRequest(() => getAutoMessage({ current: 1, pageSize: 100 }));

  const { send } = useModel('chat.websocket');
  const { current } = useModel('chat.currentUser');

  const { message } = App.useApp();

  const messageToContent = React.useCallback((msg: API.AutoMessage) => {
    switch (msg.type) {
      case 'text':
        return msg.content;
      case 'file':
        if (msg.file) {
          return msg.file.url;
        }
        return '';
      case 'navigator': {
        if (msg.navigator) {
          return JSON.stringify({
            title: msg.navigator.title,
            url: msg.navigator.url,
            image: msg.navigator.image?.url,
          });
        }
        return '';
      }
      default: {
        return '';
      }
    }
  }, []);

  return (
    <Popover
      placement={'right'}
      trigger={['click']}
      overlayStyle={{
        padding: 0,
      }}
      content={
        <div className={'w-96'}>
          <List<API.AutoMessage>
            dataSource={data}
            size={'small'}
            renderItem={(item, index) => {
              return (
                <List.Item
                  onClick={() => {
                    if (current?.id) {
                      const content = messageToContent(item);
                      if (content === '') {
                        message.error('该快捷回复无内容').then();
                      } else {
                        createMsg(content, current.id, item.type).then((msg) => {
                          send(msg);
                        });
                      }
                    }
                  }}
                >
                  {index + 1}.{`${item.name}`}
                </List.Item>
              );
            }}
            bordered={true}
          />
        </div>
      }
    >
      <UnorderedListOutlined className={'cursor-pointer'} />
    </Popover>
  );
};
export default Index;
