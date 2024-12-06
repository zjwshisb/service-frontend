import React from 'react';
import { Button, Tooltip } from 'antd';
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
        className={classNames('w-full h-[50px] flex items-center justify-center', {})}
        onClick={props.onClick}
      >
        <Button
          type={'text'}
          size={'large'}
          className={classNames('text-xl', {
            'text-green-600': props.active,
          })}
        >
          {props.children}
        </Button>
      </div>
    </Tooltip>
  );
};
export default MenuItem;
