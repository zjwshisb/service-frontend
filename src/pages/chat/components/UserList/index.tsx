import React from 'react';
import UserItem from './components/UserItem/index';
import { useModel } from '@@/plugin-model/useModel';
import styles from './index.less';

const Index: React.FC = () => {
  const { users } = useModel('useUsersModel');

  const { current } = useModel('useCurrentModel');

  const userList = React.useMemo(() => {
    let u = Array.from(users).map((v) => {
      return v[1];
    });
    if (current && users.get(current.id) === undefined) {
      u = [current].concat(u);
    }
    u = u.sort((a, b) => {
      return a.last_chat_time > b.last_chat_time ? -1 : 1;
    });
    return u.map((v) => {
      return <UserItem user={v} key={v.id} />;
    });
  }, [current, users]);

  return <div className={styles.list}>{userList}</div>;
};
export default Index;
