import React from 'react';
import Admins from './components/Admins/index';
import WaitingUser from './components/WaitingUser/index';
import Setting from './components/Setting/index';
import UserInfo from './components/UserInfo/index';
import Transfer from './components/Transfer/index';

const Index = () => {
  return React.useMemo(() => {
    return (
      <>
        <WaitingUser />
        <Transfer />
        <Admins />
        <Setting />
        <UserInfo />
      </>
    );
  }, []);
};
export default Index;
