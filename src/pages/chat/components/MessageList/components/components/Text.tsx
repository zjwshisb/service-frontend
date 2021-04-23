import React from 'react';

const Index: React.FC<{
  content: string;
}> = (props) => {
  return <div>{props.content}</div>;
};

export default Index;
