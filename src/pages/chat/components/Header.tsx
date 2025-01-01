import React from 'react';
import { useModel } from '@umijs/max';

const Header: React.FC = () => {
  const { current } = useModel('chat.currentUser');

  return (
    <div
      className={
        'border-b border-[#e1e1e1] cursor-move flex flex-shrink-0 justify-between w-full h-[60px] bg-[#f3f3f3] px-2.5 items-center'
      }
      id={'header'}
    >
      <div className={'flex text-xl'}>{current?.username}</div>
      <div className={'flex'}>
        <div className={'flex'}></div>
      </div>
    </div>
  );
};
export default Header;
