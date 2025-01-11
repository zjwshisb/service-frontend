import React from 'react';
import { useModel } from '@umijs/max';

const Header: React.FC = () => {
  const { current, setDetailShow } = useModel('chat.currentUser');

  return (
    <div
      className={
        'border-b border-[#e1e1e1]  flex flex-shrink-0 justify-between w-full h-[60px] bg-[#f3f3f3] px-2.5 items-center'
      }
    >
      <div className={'flex text-xl'}>{current?.username}</div>
      <div className={'flex-1 cursor-move h-full'} id={'header'}></div>
      <div className={'flex'}>
        <div className={'flex cursor-pointer'} onClick={() => setDetailShow((p) => !p)}>
          ...
        </div>
      </div>
    </div>
  );
};
export default Header;
