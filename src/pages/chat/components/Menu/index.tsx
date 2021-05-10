import React from 'react';
import ServiceUser from './components/ServiceUser/index';
import WaitingUser from './components/WaitingUser/index';

const Index = () => {
  return (
    <>
      <ServiceUser />
      <WaitingUser />
    </>
  );
};
export default Index;
