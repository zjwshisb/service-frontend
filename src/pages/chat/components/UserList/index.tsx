import React from 'react';
import UserItem from './components/UserItem/index';
import { useModel } from '@@/plugin-model/useModel';
import styles from './index.less';

const Index: React.FC = () => {
  const users = useModel('useUsersModel');

  const { current } = useModel('useCurrentModel');

  const userList = React.useMemo(() => {
    let u = Array.from(users.users).map((v) => {
      return v[1];
    });
    u = u.sort((a, b) => {
      if (a.online && !b.online) {
        return -1;
      }
      if (a.online === b.online) {
        return 0;
      }
      return 1;
    });
    if (current) {
      u = [current].concat(u);
    }
    return u.map((v) => {
      return <UserItem user={v} key={v.id} />;
    });
  }, [current, users.users]);

  return <div className={styles.list}>{userList}</div>;
};
export default Index;
