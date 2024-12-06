import React from 'react';
import { Image as BaseImage } from 'antd';

const Image: React.FC<{
  content: string;
}> = (props) => {
  return <BaseImage src={props.content} />;
};

export default Image;
