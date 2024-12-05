import React from 'react';

const Index: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={'text-center text-gray-500 my-1 text-md'}>{props.children}</div>;
};

export default Index;
