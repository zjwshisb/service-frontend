import React from 'react';
import { isUrl } from '@/utils/utils';
import classNames from 'classnames';

const Text: React.FC<{
  content: string;
  className?: string;
}> = (props) => {
  return (
    <div
      className={classNames(props.className, 'p-1 rounded text-base whitespace-pre-wrap break-all')}
    >
      {isUrl(props.content) ? (
        <a target="_blank" href={props.content} rel="noreferrer">
          <div>{props.content}</div>
        </a>
      ) : (
        <div>{props.content}</div>
      )}
    </div>
  );
};

export default Text;
