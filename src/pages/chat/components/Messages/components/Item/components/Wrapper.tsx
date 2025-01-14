import React from 'react';
import classNames from 'classnames';
import { MessageDirection } from '../index';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';

const Wrapper: React.FC<
  React.PropsWithChildren<{
    direction?: MessageDirection;
    bgColor?: boolean;
    className?: string;
    showAnchor?: boolean;
  }>
> = (props) => {
  const { bgColor = false, className, direction, showAnchor = false } = props;

  return (
    <div
      className={classNames(className, 'text-base whitespace-pre-wrap break-all relative', {
        'bg-white': direction === 'left' && bgColor,
        'bg-[#95ec69]': direction === 'right' && bgColor,
        'text-[#0f170a]': direction === 'right' && bgColor,
        'p-1 rounded': bgColor,
        'mx-1': showAnchor,
      })}
    >
      {props.children}
      {showAnchor && direction === 'right' && (
        <CaretRightOutlined className={'absolute top-2 right-[-10px] text-[#95ec69]'} />
      )}
      {showAnchor && direction === 'left' && (
        <CaretLeftOutlined className={'absolute top-2 left-[-10px] text-white'} />
      )}
    </div>
  );
};

export default Wrapper;
