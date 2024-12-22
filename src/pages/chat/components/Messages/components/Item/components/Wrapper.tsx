import React from 'react';
import classNames from 'classnames';
import { MessageSourceType } from '../index';
const Wrapper: React.FC<
  React.PropsWithChildren<{
    sourceType?: MessageSourceType;
    bgColor?: boolean;
    className?: string;
  }>
> = (props) => {
  const { bgColor = false, className, sourceType = 'send' } = props;

  return (
    <div
      className={classNames(className, 'text-base whitespace-pre-wrap break-all', {
        'bg-white': sourceType === 'receive' && bgColor,
        'bg-[#95ec69]': sourceType === 'send' && bgColor,
        'text-[#0f170a]': sourceType === 'send' && bgColor,
        'p-1 rounded': bgColor,
      })}
    >
      {props.children}
    </div>
  );
};

export default Wrapper;
