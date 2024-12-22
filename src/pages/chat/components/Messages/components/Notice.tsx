import React from 'react';

const Notice: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={'text-center text-gray-500 my-1 text-md'}>{props.children}</div>;
};

export default Notice;
