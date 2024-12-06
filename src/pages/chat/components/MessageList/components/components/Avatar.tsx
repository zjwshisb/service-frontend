import React from 'react';
import { Avatar as BaseAvatar } from 'antd';
import { Else, If, Then } from 'react-if';

const Avatar: React.FC<{
  src?: string;
}> = (props) => {
  return (
    <If condition={props.src}>
      <Then>{() => <BaseAvatar size={30} shape={'square'} src={props.src} />}</Then>
      <Else>
        <BaseAvatar size={30} shape={'square'}>
          u
        </BaseAvatar>
      </Else>
    </If>
  );
};
export default Avatar;
