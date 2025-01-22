import React from 'react';
import { useSnapshot } from '@umijs/max';
import CusDiv from '@/components/CusDiv';
import currentUser from '@/pages/chat/store/currentUser';

const Header: React.FC = () => {
  const currentUserStore = useSnapshot(currentUser);

  return (
    <CusDiv
      className={
        'border-b flex flex-shrink-0 justify-between w-full h-[60px] bg-[#f3f3f3] px-2.5 items-center'
      }
    >
      <div className={'flex text-xl cursor-pointer'} onClick={() => currentUserStore.triggerShow()}>
        {currentUserStore.current?.username}
      </div>
      <div className={'flex-1 cursor-move h-full'} id={'header'}></div>
      <div className={'flex'}>
        <div className={'flex cursor-pointer'} onClick={() => currentUserStore.triggerShow()}>
          ...
        </div>
      </div>
    </CusDiv>
  );
};
export default Header;
