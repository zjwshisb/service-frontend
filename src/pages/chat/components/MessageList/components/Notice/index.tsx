import React from 'react';

const Index: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={'text-center text-gray-600'}>{props.children}</div>;
};

export default Index;
