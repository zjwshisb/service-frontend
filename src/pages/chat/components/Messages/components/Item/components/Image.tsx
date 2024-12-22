import React from 'react';
import { Image as BaseImage } from 'antd';
import Wrapper from './Wrapper';
const Image: React.FC<{
  content: string;
}> = (props) => {
  return (
    <Wrapper>
      <BaseImage className={'max-w-full'} src={props.content} />
    </Wrapper>
  );
};

export default Image;
