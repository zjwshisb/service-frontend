import React from 'react';
import { UnorderedListOutlined } from '@ant-design/icons/lib';
import { Popover, List, Button } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import styles from './index.less';
import AddForm from './components/addForm';
import { createMsg } from '@/utils';

const Index = () => {
  const { replies, deleteShortcutReply } = useModel('useShortcutReplyModel');
  const { send } = useModel('useWebsocketModel');
  const { current } = useModel('useCurrentModel');

  return (
    <Popover
      placement={'right'}
      trigger={['click']}
      content={
        <div className={styles.list}>
          <List<API.ShortcutReply>
            dataSource={replies}
            size={'small'}
            renderItem={(item, index) => {
              return (
                <List.Item
                  onClick={() => {
                    if (current?.id) {
                      send(createMsg(item.content, current.id));
                    }
                  }}
                  actions={[
                    <Button
                      onClick={(e) => {
                        deleteShortcutReply(item.id).then();
                        e.stopPropagation();
                      }}
                      type={'text'}
                      size={'small'}
                      danger={true}
                    >
                      删除
                    </Button>,
                  ]}
                  className={styles.list_item}
                >
                  {index + 1}.{item.content}
                </List.Item>
              );
            }}
            bordered={true}
            header={
              <div className={styles.list_header}>
                <AddForm />
              </div>
            }
          />
        </div>
      }
    >
      <UnorderedListOutlined className={'action-icon'} />
    </Popover>
  );
};
export default Index;
