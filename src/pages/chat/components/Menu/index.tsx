import React from 'react';
import ServiceUser from './components/ServiceUser/index';
import WaitingUser from './components/WaitingUser/index';
import Setting from './components/Setting/index';
import UserInfo from './components/UserInfo/index';

const Index = () => {
  return React.useMemo(() => {
    return (
      <>
        <WaitingUser />
        <ServiceUser />
        <Setting />
        <UserInfo />
      </>
    );
  }, []);
};
export default Index;
