import React from 'react';
import { Image } from 'antd';

const Index: React.FC<{
  content: string;
}> = (props) => {
  return <Image src={props.content}></Image>;
};

export default Index;
