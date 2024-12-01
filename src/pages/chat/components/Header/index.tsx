import React from 'react';
import { Avatar } from 'antd';
import { useModel } from '@@/exports';

const Index: React.FC = () => {
  const initialState = useModel('@@initialState');

  const { setting } = useModel('chat.adminSetting');

  return (
    <div
      className={
        'border-b cursor-move flex flex-shrink-0 justify-between w-full h-[60px] bg-[#f3f3f3]'
      }
      id={'header'}
    >
      <div className={'flex'} />
      <div className={'flex px-2.5'}>
        <div className={'flex items-center h-full'}>
          <Avatar src={setting?.avatar?.thumb_url} shape="square" className={'cursor-pointer'}>
            {initialState.initialState?.currentUser?.username}
          </Avatar>
        </div>
      </div>
    </div>
  );
};
export default Index;
