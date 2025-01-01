import React from 'react';
import { UnorderedListOutlined } from '@ant-design/icons/lib';
import { App, List, Popover, Typography } from 'antd';
import { useModel, useRequest } from '@umijs/max';
import { getAutoMessage } from '@/services/auto';

const ShortcutReply = () => {
  const { data } = useRequest(() => getAutoMessage({ current: 1, pageSize: 100 }));

  const { send } = useModel('chat.websocket');

  const { message } = App.useApp();

  const getContent = React.useCallback((msg: API.AutoMessage) => {
    switch (msg.type) {
      case 'text':
        return msg.content;
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
      case 'video':
      case 'audio':
      case 'image':
      case 'pdf':
        if (msg.file) {
          return msg.file.url;
        }
        return '';
      default: {
        return '';
      }
    }
  }, []);

  return (
    <Popover
      placement={'right'}
      trigger={['click']}
      overlayInnerStyle={{
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
                  className={'cursor-pointer hover:bg-stone-100'}
                  onClick={() => {
                    const content = getContent(item);
                    if (content === '') {
                      message.error('该快捷回复无内容').then();
                    } else {
                      send(content, item.type);
                    }
                  }}
                >
                  <Typography.Text ellipsis={true}>
                    {index + 1}.{`${item.name}`}
                  </Typography.Text>
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
export default ShortcutReply;
