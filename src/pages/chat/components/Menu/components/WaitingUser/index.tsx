import React, { useState } from 'react';
import { MessageOutlined } from '@ant-design/icons/lib';
import { useModel } from '@@/plugin-model/useModel';
import { Drawer, List, message, Skeleton, Avatar } from 'antd';
import { timeFormat } from '@/utils';
import { handleAccept } from '@/services';
import lodash from 'lodash';
import styles from '../index.less';

const Index = () => {
  const { waitingUsers } = useModel('useWaitingUserModel');
  const setUsers = useModel('useUsersModel', (model) => model.setUsers);
  const [visible, setVisible] = React.useState(false);
  const [color, setColor] = useState('none');

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (waitingUsers.length === 0) {
      interval = setInterval(() => {
        setColor((prevState) => {
          if (prevState === '#000') {
            return '#1890ff';
          }
          return '#000';
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [waitingUsers.length]);

  return (
    <div className={styles.item} onClick={() => setVisible(true)} data-active={visible}>
      <Drawer
        bodyStyle={{ padding: 0 }}
        closable={false}
        width={350}
        placement={'left'}
        visible={visible}
        onClose={(e) => {
          setVisible(false);
          e.stopPropagation();
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={waitingUsers}
          rowKey={'id'}
          size={'small'}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  onClick={(e) => {
                    handleAccept(item.id).then((res) => {
                      setUsers((prevState) => {
                        const newState = lodash.clone(prevState);
                        newState.set(res.data.id, res.data);
                        return newState;
                      });
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
                    <div className="aa">
                      <span>{item.username}</span>
                      <span>{timeFormat(item.last_time)}</span>
                    </div>
                  }
                  description={
                    <div>
                      <span>{item.last_message}</span>
                    </div>
                  }
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Drawer>
      <MessageOutlined style={{ color }} />
    </div>
  );
};
export default Index;
