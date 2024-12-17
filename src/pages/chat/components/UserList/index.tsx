import React, { useState } from 'react';
import UserItem from './components/UserItem/index';
import { useModel, Helmet } from '@umijs/max';
import TransferForm from './components/TransferForm/index';
import { Empty } from 'antd';
import { If, Then, Else } from 'react-if';

const UserList: React.FC = () => {
  const { current } = useModel('chat.currentUser');
  const { users } = useModel('chat.users');

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
    <div className={'flex-shrink-0 overflow-x-hidden w-[300px] overflow-y-auto border-r h-full'}>
      <TransferForm />
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>
      <If condition={userList.length > 0}>
        <Then>{userList}</Then>
        <Else>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无会话'} />
        </Else>
      </If>
    </div>
  );
};
export default UserList;
