import React from 'react';
import Admins from './components/Admins';
import WaitingUsers from './components/WaitingUsers';
import Setting from './components/Setting';
import UserInfo from './components/UserInfo';
import TransferUsers from './components/TransferUsers';
import { Avatar } from 'antd';
import { useModel } from '@umijs/max';

const Index = () => {
  const initialState = useModel('@@initialState');

  const { setting } = useModel('chat.adminSetting');
  return (
    <div className={'w-[60px] h-full bg-[#e1e1e1] flex flex-col items-center py-10'}>
      <Avatar src={setting?.avatar?.thumb_url} shape="square" className={'rounded mb-2'}>
        {initialState.initialState?.currentUser?.username}
      </Avatar>
      <WaitingUsers />
      <TransferUsers />
      <Admins />
      <Setting />
      <UserInfo />
    </div>
  );
};
export default Index;
