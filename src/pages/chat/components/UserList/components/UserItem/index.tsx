import React from 'react';
import { Avatar, Badge } from 'antd';
import { useModel } from '@umijs/max';
import lodash from 'lodash';
import LastTime from './components/LastTime';
import LastMessage from './components/LastMessage';
import Menu from './components/Menu/index';
import { handleRead } from '@/services';
import styles from './index.less';

const Index: React.FC<{
  user: API.User;
}> = ({ user }) => {
  const { setCurrent, current, goTop } = useModel('chat.currentUser');
  const { removeUser, addUser } = useModel('chat.users');

  const onClick = React.useCallback(() => {
    if (user.unread > 0) {
      user.unread = 0;
      if (user.messages.length > 0) {
        handleRead(user.id, user.messages[0].id).then().catch();
      } else {
        handleRead(user.id).then().catch();
      }
    }
    if (current) {
      addUser(current);
    }
    removeUser(user);
    setCurrent(lodash.cloneDeep(user));
    goTop();
  }, [addUser, current, goTop, removeUser, setCurrent, user]);

  return (
    <div
      className={styles.item}
      onClick={() => onClick()}
      data-active={current && current.id === user.id}
      data-online={user.online}
    >
      <div className={styles.avatar}>
        <Badge count={user.unread} size={'small'}>
          <Avatar size={50} shape="square" src={user.avatar}>
            {user.username}
          </Avatar>
        </Badge>
      </div>
      <div className={styles.info}>
        <div className={styles.first}>
          <div className={styles.name}>{user.username}</div>
          <div className={styles.time}>
            {user.last_message && <LastTime time={user.last_message.received_at} />}
          </div>
        </div>
        <div className={styles.last}>
          <div className={styles.message}>
            {user.last_message && <LastMessage message={user.last_message} />}
          </div>
          <div className={styles.action}>
            <Menu user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
