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
}> = (props) => {
  const { setCurrent, current, goTop } = useModel('chat.currentUser');
  const { setUsers } = useModel('chat.users');

  const onClick = React.useCallback(
    (id: number) => {
      setUsers((prevState) => {
        const newUsers = lodash.cloneDeep(prevState);
        const user = newUsers.get(id);
        if (!user) {
          return prevState;
        }
        if (user.unread > 0) {
          user.unread = 0;
          if (user.messages.length > 0) {
            handleRead(user.id, user.messages[0].id).then().catch();
          } else {
            handleRead(user.id).then().catch();
          }
        }
        if (current) {
          newUsers.set(current.id, current);
        }
        newUsers.delete(id);
        setCurrent(lodash.cloneDeep(user));
        goTop();
        return newUsers;
      });
    },
    [current, goTop, setCurrent, setUsers],
  );

  const { length } = props.user.messages;

  const lastMessage: API.Message | undefined = React.useMemo(() => {
    return length > 0 ? props.user.messages[0] : undefined;
  }, [length, props.user.messages]);

  return React.useMemo(() => {
    return (
      <div
        className={styles.item}
        onClick={() => onClick(props.user.id)}
        data-active={current && current.id === props.user.id}
        data-online={props.user.online}
      >
        <div className={styles.avatar}>
          <Badge count={props.user.unread} size={'small'}>
            <Avatar size={50} shape="square" src={props.user.avatar}>
              {props.user.username}
            </Avatar>
          </Badge>
        </div>
        <div className={styles.info}>
          <div className={styles.first}>
            <div className={styles.name}>{props.user.username}</div>
            <div className={styles.time}>
              {lastMessage && <LastTime time={lastMessage.received_at} />}
            </div>
          </div>
          <div className={styles.last}>
            <div className={styles.message}>
              {lastMessage && <LastMessage message={lastMessage} />}
            </div>
            <div className={styles.action}>
              <Menu user={props.user} />
            </div>
          </div>
        </div>
      </div>
    );
  }, [current, lastMessage, onClick, props.user]);
};
export default Index;
