import React, { useState } from 'react';
import UserItem from './components/UserItem/index';
import { useModel, Helmet } from '@umijs/max';
import TransferForm from './components/TransferForm/index';
import { Empty } from 'antd';

const Index: React.FC = () => {
  const { users } = useModel('chat.users');

  const { current } = useModel('chat.currentUser');

  const [title, setTile] = useState('');

  const userList = React.useMemo(() => {
    let unread = 0;
    let u = Array.from(users).map((v) => {
      unread += v[1].unread;
      return v[1];
    });
    if (current) {
      u = [current].concat(u);
      unread += current.unread;
    }
    u = u.sort((a, b) => {
      if (a.last_chat_time === b.last_chat_time) {
        return a.id > b.id ? -1 : 1;
      }
      return a.last_chat_time > b.last_chat_time ? -1 : 1;
    });
    setTile(`客服-未读消息(${unread})`);
    return u.map((v) => {
      return <UserItem user={v} key={v.id} />;
    });
  }, [current, users]);

  return (
    <div className={'flex-shrink-0 w-1/3 overflow-y-auto border-r h-full'}>
      <TransferForm />
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>
      {userList.length > 0 ? (
        userList
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无会话'} />
      )}
    </div>
  );
};
export default Index;
