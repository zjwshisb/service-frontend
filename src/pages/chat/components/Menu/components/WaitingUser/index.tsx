import React from 'react';
import { MessageOutlined } from '@ant-design/icons/lib';
import { useModel } from '@@/plugin-model/useModel';
import { List, message, Skeleton, Avatar, Badge, Tag } from 'antd';
import { timeFormat } from '@/utils';
import { handleAccept } from '@/services';
import lodash from 'lodash';
import styles from '../index.less';
import DraggableView from '@/components/DraggableView';

const Index = () => {
  const { waitingUsers } = useModel('useWaitingUserModel');
  const { current, setCurrent, goTop } = useModel('useCurrentModel');
  const setUsers = useModel('useUsersModel', (model) => model.setUsers);
  return (
    <DraggableView
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
          emptyText: '暂无待接入用户',
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a
                onClick={(e) => {
                  handleAccept(item.id).then((res) => {
                    if (res.data.id === current?.id) {
                      goTop();
                      setCurrent(res.data);
                    } else {
                      setUsers((prevState) => {
                        const newState = lodash.clone(prevState);
                        newState.set(res.data.id, res.data);
                        return newState;
                      });
                    }
                    message.success('接入成功');
                    e.stopPropagation();
                  });
                }}
              >
                接入
              </a>,
            ]}
          >
            <Skeleton avatar title={false} active loading={false}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar}>{item.username}</Avatar>}
                title={
                  <div>
                    <span>{item.username}</span>
                    <span style={{ marginLeft: '20px' }}>{timeFormat(item.last_time)}</span>
                  </div>
                }
                description={
                  <div>
                    <Tag color="red">{item.message_count}</Tag>
                    <span>{item.last_message}</span>
                  </div>
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
