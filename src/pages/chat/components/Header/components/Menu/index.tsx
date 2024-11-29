import React from 'react';
import { Avatar } from 'antd';
import { useModel } from '@umijs/max';

const Index = () => {
  const initialState = useModel('@@initialState');

  const { setting } = useModel('chat.adminSetting');

  return (
    <div className={'flex items-center h-full'}>
      <Avatar src={setting?.avatar} shape="square" className={'cursor-pointer'}>
        {initialState.initialState?.currentUser?.username}
      </Avatar>
    </div>
  );
};
export default Index;
