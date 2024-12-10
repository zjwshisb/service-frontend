import React from 'react';
import Admins from './components/Admins/index';
import WaitingUser from './components/WaitingUser/index';
import Setting from './components/Setting/index';
import UserInfo from './components/UserInfo/index';
import Transfer from './components/Transfer/index';

const Index = () => {
  return React.useMemo(() => {
    return (
      <div className={'w-full flex flex-col items-center'}>
        <WaitingUser />
        <Transfer />
        <Admins />
        <Setting />
        <UserInfo />
      </div>
    );
  }, []);
};
export default Index;
