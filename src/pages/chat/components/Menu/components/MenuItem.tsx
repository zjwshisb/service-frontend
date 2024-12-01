import React from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';

const MenuItem: React.FC<
  React.PropsWithChildren<{
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    active?: boolean;
    title?: string;
  }>
> = (props) => {
  return (
    <Tooltip title={props.title} placement={'left'}>
      <div
        className={classNames(
          'w-full h-[50px] text-xl flex items-center justify-center cursor-pointer ',
          {
            'text-green-600': props.active,
          },
        )}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    </Tooltip>
  );
};
export default MenuItem;
