import React from 'react';
import { Badge, BadgeProps, Button, Tooltip } from 'antd';
import classNames from 'classnames';
import { Else, If, Then } from 'react-if';

const Wrapper: React.FC<
  React.PropsWithChildren<{
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    active?: boolean;
    title?: string;
    badge?: BadgeProps;
  }>
> = (props) => {
  const child = (
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
  );

  return (
    <Tooltip title={props.title} placement={'left'}>
      <If condition={props.badge !== undefined}>
        <Then>
          <Badge
            {...props.badge}
            size={'small'}
            styles={{
              indicator: {
                top: '10px',
                right: '10px',
              },
            }}
          >
            {child}
          </Badge>
        </Then>
        <Else>{child}</Else>
      </If>
    </Tooltip>
  );
};
export default Wrapper;