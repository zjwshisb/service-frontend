import React from 'react';
import classNames from 'classnames';
import { MessageDirection } from '../index';

const Wrapper: React.FC<
  React.PropsWithChildren<{
    direction?: MessageDirection;
    bgColor?: boolean;
    className?: string;
  }>
> = (props) => {
  const { bgColor = false, className, direction } = props;

  return (
    <div
      className={classNames(className, 'text-base whitespace-pre-wrap break-all', {
        'bg-white': direction === 'left' && bgColor,
        'bg-[#95ec69]': direction === 'right' && bgColor,
        'text-[#0f170a]': direction === 'right' && bgColor,
        'p-1 rounded': bgColor,
      })}
    >
      {props.children}
    </div>
  );
};

export default Wrapper;
