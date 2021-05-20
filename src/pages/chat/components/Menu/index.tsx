import React from 'react';
import ServiceUser from './components/ServiceUser/index';
import WaitingUser from './components/WaitingUser/index';
import Setting from './components/Setting/index';
import Shortcut from './components/Shortcut/index';

const Index = () => {
  return React.useMemo(() => {
    return (
      <>
        <WaitingUser />
        <ServiceUser />
        <Setting />
        <Shortcut />
      </>
    );
  }, []);
};
export default Index;
