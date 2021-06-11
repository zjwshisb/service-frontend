import React from 'react';
import { isUrl } from '@/utils/utils';

const Index: React.FC<{
  content: string;
}> = (props) => {
  console.log(props.content);
  return (
    <>
      {isUrl(props.content) ? (
        <a target="_blank" href={props.content}>
          <div>{props.content}</div>
        </a>
      ) : (
        <div>{props.content}</div>
      )}
    </>
  );
};

export default Index;
