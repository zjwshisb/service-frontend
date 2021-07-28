import React, { useState } from 'react';
import UserItem from './components/UserItem/index';
import { useModel } from '@@/plugin-model/useModel';
import styles from './index.less';
import { Helmet } from 'umi';

const Index: React.FC = () => {
  const { users } = useModel('useUsersModel');

  const { current } = useModel('useCurrentModel');

  const [title, setTile] = useState('');

  const userList = React.useMemo(() => {
    let unread = 0;
    let u = Array.from(users).map((v) => {
      unread += v[1].unread;
      return v[1];
    });
    if (current && users.get(current.id) === undefined) {
      u = [current].concat(u);
      unread += current.unread;
    }
    u = u.sort((a, b) => {
      return a.last_chat_time > b.last_chat_time ? -1 : 1;
    });
    setTile(`客服-未读消息(${unread})`);
    return u.map((v) => {
      return <UserItem user={v} key={v.id} />;
    });
  }, [current, users]);

  return (
    <div className={styles.list}>
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>
      {userList}
    </div>
  );
};
export default Index;
