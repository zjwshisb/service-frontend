import React from 'react';
import { UnorderedListOutlined } from '@ant-design/icons/lib';
import { Popover, List } from 'antd';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { createMsg } from '@/utils';
import { getAutoMessage } from '@/services/auto';

const Index = () => {
  const [messages, setMessages] = React.useState<API.AutoMessage[]>([]);

  React.useEffect(() => {
    getAutoMessage({ current: 1, pageSize: 100 }).then((res) => {
      setMessages(res.data);
    });
  }, []);
  const { send } = useModel('useWebsocketModel');
  const { current } = useModel('useCurrentModel');

  return (
    <Popover
      placement={'right'}
      trigger={['click']}
      content={
        <div className={styles.list}>
          <List<API.AutoMessage>
            dataSource={messages}
            size={'small'}
            renderItem={(item, index) => {
              return (
                <List.Item
                  onClick={() => {
                    if (current?.id) {
                      createMsg(item.content, current.id, item.type).then((msg) => {
                        send(msg);
                      });
                    }
                  }}
                  className={styles.list_item}
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
      <UnorderedListOutlined className={'action-icon'} />
    </Popover>
  );
};
export default Index;
