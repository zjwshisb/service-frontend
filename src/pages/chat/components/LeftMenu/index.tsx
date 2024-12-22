import React from 'react';
import Admins from './components/Admins';
import WaitingUsers from './components/WaitingUsers';
import Setting from './components/Setting';
import UserInfo from './components/UserInfo';
import TransferUsers from './components/TransferUsers';

const Index = () => {
  return React.useMemo(() => {
    return (
      <div className={'w-[60px] h-full bg-[#ebeced] flex flex-col items-center'}>
        <WaitingUsers />
        <TransferUsers />
        <Admins />
        <Setting />
        <UserInfo />
      </div>
    );
  }, []);
};
export default Index;
