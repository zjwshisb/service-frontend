import React from 'react';
import Draggable from 'react-draggable';
import usePortal from '@/hooks/usePortal';
import classNames from 'classnames';
import { Icon } from '@iconify/react';
import { Button } from 'antd';

const Index: React.FC<
  React.PropsWithChildren<{
    trigger: (visible: boolean) => React.ReactNode;
    triggerClass?: string;
    width?: string;
    top?: string;
    left?: string;
    defaultVisible?: boolean;
    title?: string;
  }>
> = (props) => {
  const [visible, setVisible] = React.useState(() => {
    if (props.defaultVisible === undefined) {
      return true;
    }
    return props.defaultVisible;
  });
  return (
    <div>
      <div className={props.triggerClass} onClick={() => setVisible((prevState) => !prevState)}>
        {props.trigger(visible)}
      </div>
      {usePortal(
        <Draggable handle={'.header'}>
          <div
            className={classNames('fixed box-border bg-white rounded overflow-hidden shadow', {
              hidden: !visible,
            })}
            style={{ width: props.width, top: props.top, left: props.left }}
          >
            <div
              className={`flex cursor-move header px-2 py-1 bg-stone-100 justify-between items-center`}
            >
              <div>{props.title}</div>
              <div className={'text-lg'}>
                <Button type={'text'}>
                  <Icon
                    icon={'mdi:close'}
                    onClick={() => {
                      setVisible(false);
                    }}
                  ></Icon>
                </Button>
              </div>
            </div>
            <div>{props.children}</div>
          </div>
        </Draggable>,
        'chat',
      )}
    </div>
  );
};

export default Index;
