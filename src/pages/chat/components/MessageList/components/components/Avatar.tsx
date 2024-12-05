import React from 'react';
import { Avatar } from 'antd';
import { Else, If, Then } from 'react-if';

const Index: React.FC<{
  src?: string;
}> = (props) => {
  return (
    <If condition={props.src}>
      <Then>{() => <Avatar size={30} shape={'square'} src={props.src} />}</Then>
      <Else>
        <Avatar size={30} shape={'square'}>
          u
        </Avatar>
      </Else>
    </If>
  );
};
export default Index;
