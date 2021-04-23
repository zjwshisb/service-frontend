import React from 'react';
import { Avatar } from 'antd';

const Index: React.FC<{
  src: string;
}> = (props) => {
  return (
    <>
      {props.src ? (
        <Avatar size={30} shape={'square'} src={props.src} />
      ) : (
        <Avatar size={30} shape={'square'}>
          u
        </Avatar>
      )}
    </>
  );
};
export default Index;
