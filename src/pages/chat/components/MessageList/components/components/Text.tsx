import React from 'react';
import { isUrl } from '@/utils/utils';

const Text: React.FC<{
  content: string;
}> = (props) => {
  return (
    <>
      {isUrl(props.content) ? (
        <a target="_blank" href={props.content} rel="noreferrer">
          <div>{props.content}</div>
        </a>
      ) : (
        <div>{props.content}</div>
      )}
    </>
  );
};

export default Text;
