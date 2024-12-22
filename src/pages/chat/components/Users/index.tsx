import React, { useState } from 'react';
import UserItem from './components/UserItem';
import { Helmet, useModel } from '@umijs/max';
import TransferForm from './components/TransferForm';
import { Empty } from 'antd';
import { Else, If, Then } from 'react-if';
import HistorySession from './components/HistorySession';
import CusDiv from '@/components/CusDiv';

const UserList: React.FC = () => {
  const { users } = useModel('chat.users');

  const [title, setTile] = useState('');

  const userList = React.useMemo(() => {
    let unread = 0;
    let u = Array.from(users).map((v) => {
      unread += v[1].unread;
      return v[1];
    });
    u = u.sort((a, b) => {
      if (a.last_chat_time === b.last_chat_time) {
        return a.id > b.id ? -1 : 1;
      }
      return a.last_chat_time > b.last_chat_time ? -1 : 1;
    });
    setTile(`未读消息(${unread})`);
    return u.map((v) => {
      return <UserItem user={v} key={v.id} />;
    });
  }, [users]);

  return (
    <CusDiv className={'overflow-x-hidden h-full'}>
      <TransferForm />
      <HistorySession />
      <Helmet defer={false}>
        <title>{title}</title>
      </Helmet>
      <If condition={userList.length > 0}>
        <Then>{userList}</Then>
        <Else>
          <div className={'w-full h-full flex items-center justify-center'}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无会话'} />
          </div>
        </Else>
      </If>
    </CusDiv>
  );
};
export default UserList;
