import React from 'react';
import { Avatar, Badge } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import lodash from 'lodash';
import LastTime from './components/LastTime';
import LastMessage from './components/LastMessage';
import Remove from './components/Remove';
import { handleRead } from '@/services';
import styles from './index.less';

const Index: React.FC<{
  user: APP.User;
}> = (props) => {
  const { setCurrent, current } = useModel('useCurrentModel');
  const { setUsers } = useModel('useUsersModel');

  const onClick = React.useCallback(
    (id) => {
      setUsers((prevState) => {
        const newUsers = lodash.cloneDeep(prevState);
        const user = newUsers.get(id);
        if (user) {
          if (user.unread > 0) {
            user.unread = 0;
            handleRead(user.id).then().catch();
          }
          setCurrent(lodash.cloneDeep(user));
          if (current) {
            newUsers.set(current.id, current);
          }
          newUsers.delete(id);
        }
        return newUsers;
      });
    },
    [current, setCurrent, setUsers],
  );

  const { length } = props.user.messages;

  const lastMessage: APP.Message | undefined =
    length > 0 ? props.user.messages[length - 1] : undefined;

  return React.useMemo(() => {
    return (
      <div
        className={styles.item}
        onClick={() => onClick(props.user.id)}
        data-active={current && current.id === props.user.id}
      >
        <div className={styles.avatar}>
          <Badge count={props.user.unread} size={'small'}>
            <Avatar size={50} shape="square">
              {props.user.username}
            </Avatar>
          </Badge>
        </div>
        <div className={styles.info}>
          <div className={styles.first}>
            <div className={styles.name} data-online={props.user.online}>
              {props.user.username}
            </div>
            <div className={styles.time}>
              {lastMessage && <LastTime time={lastMessage.received_at} />}
            </div>
          </div>
          <div className={styles.last}>
            <div className={styles.message}>
              {lastMessage && <LastMessage message={lastMessage} />}
            </div>
            <div className={styles.action}>
              <Remove user={props.user} />
            </div>
          </div>
        </div>
      </div>
    );
  }, [current, lastMessage, onClick, props.user]);
};
export default Index;
