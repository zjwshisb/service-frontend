import React from 'react';
import { Avatar, Badge, Dropdown } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import lodash from 'lodash';
import LastTime from './components/LastTime';
import LastMessage from './components/LastMessage';
import Menu from './components/Menu';
import { handleRead } from '@/services';
import styles from './index.less';

const Index: React.FC<{
  user: APP.User;
}> = (props) => {
  const { setCurrent, current, goTop } = useModel('useCurrentModel');
  const { setUsers } = useModel('useUsersModel');
  const [menuVisible, setMenuVisible] = React.useState(false);

  const onClick = React.useCallback(
    (id) => {
      setUsers((prevState) => {
        const newUsers = lodash.cloneDeep(prevState);
        const user = newUsers.get(id);
        if (!user) {
          return prevState;
        }
        if (user.unread > 0) {
          user.unread = 0;
          handleRead(user.id).then().catch();
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

  const lastMessage: APP.Message | undefined = React.useMemo(() => {
    return length > 0 ? props.user.messages[0] : undefined;
  }, [length, props.user.messages]);

  return React.useMemo(() => {
    return (
      <Dropdown
        overlay={<Menu user={props.user} />}
        onVisibleChange={setMenuVisible}
        trigger={['contextMenu']}
      >
        <div
          data-menu-visible={menuVisible}
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
            </div>
          </div>
        </div>
      </Dropdown>
    );
  }, [current, lastMessage, menuVisible, onClick, props.user]);
};
export default Index;
