import React from 'react';
import Admins from './components/Admins';
import WaitingUsers from './components/WaitingUsers';
import Setting from './components/Setting';
import TransferUsers from './components/TransferUsers';
import { Avatar } from 'antd';
import { useModel, useSnapshot } from '@umijs/max';
import adminSetting from '@/pages/chat/store/adminSetting';

const Index = () => {
  const initialState = useModel('@@initialState');

  const { setting } = useSnapshot(adminSetting);
  return (
    <div className={'w-[60px] h-full bg-[#e1e1e1] flex flex-col items-center py-10 relative'}>
      <Avatar src={setting?.avatar?.thumb_url} shape="square" className={'rounded mb-2'}>
        {initialState.initialState?.currentUser?.username}
      </Avatar>
      <WaitingUsers />
      <TransferUsers />
      <Admins />
      <Setting />
    </div>
  );
};
export default Index;
