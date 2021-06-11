import React from 'react';
import ServiceUser from './components/ServiceUser/index';
import WaitingUser from './components/WaitingUser/index';
import Setting from './components/Setting/index';

const Index = () => {
  return React.useMemo(() => {
    return (
      <>
        <WaitingUser />
        <ServiceUser />
        <Setting />
      </>
    );
  }, []);
};
export default Index;
