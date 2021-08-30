import React from 'react';
import { MessageOutlined } from '@ant-design/icons/lib';
import { useModel } from '@@/plugin-model/useModel';
import { List, Skeleton, Avatar, Badge } from 'antd';
import { timeFormat } from '@/utils';
import styles from '../index.less';
import myStyles from './index.less';
import DraggableView from '@/components/DraggableView';
import { getMessageTypeLabel } from '@/pages/chat/util';
import { Typography } from 'antd';
import useAcceptUser from '@/hooks/useAcceptUser';

const Index = () => {
  const { setOnMessage } = useModel('useWebsocketModel');

  const { waitingUsers, setWaitingUsers } = useModel('useWaitingUserModel');
  const { setting } = useModel('useSettingModel');

  React.useEffect(() => {
    setOnMessage((action: API.Action<API.WaitingUser[]>) => {
      if (action.action === 'waiting-users') {
        setWaitingUsers(action.data);
      }
    }, 'waiting-users');
  }, [setOnMessage, setWaitingUsers]);

  const accept = useAcceptUser();

  React.useEffect(() => {
    if (setting?.is_auto_accept) {
      if (waitingUsers.length > 0) {
        accept(waitingUsers[0].id);
      }
    }
  }, [accept, setting, waitingUsers]);

  return (
    <DraggableView
      title={'待接入用户'}
      width={'350px'}
      trigger={(visible) => (
        <div className={styles.item}>
          <Badge count={waitingUsers.length} size={'small'}>
            <MessageOutlined className={styles.icon} data-active={visible} />
          </Badge>
        </div>
      )}
    >
      <List
        itemLayout="horizontal"
        dataSource={waitingUsers}
        rowKey={'id'}
        size={'small'}
        locale={{
          emptyText: '暂无数据',
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a
                onClick={(e) => {
                  accept(item.id);
                  e.stopPropagation();
                }}
              >
                接入
              </a>,
            ]}
          >
            <Skeleton avatar title={false} active loading={false}>
              <List.Item.Meta
                className={myStyles.listItem}
                avatar={<Avatar src={item.avatar}>{item.username}</Avatar>}
                title={
                  <div>
                    <span>{item.username}</span>
                    <span className={myStyles.time} style={{ marginLeft: '20px' }}>
                      {timeFormat(item.last_time)}
                    </span>
                  </div>
                }
                description={
                  <Badge
                    count={item.message_count}
                    size={'small'}
                    className={myStyles.messageContent}
                  >
                    <Typography.Text ellipsis={true} className={myStyles.messageContent}>
                      {getMessageTypeLabel(item.last_message, item.last_type)}
                    </Typography.Text>
                  </Badge>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </DraggableView>
  );
};
export default Index;
