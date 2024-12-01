import React from 'react';
import Draggable from 'react-draggable';
import usePortal from '@/hooks/usePortal';
import classNames from 'classnames';

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
            <div className={`flex h-[60px] header`}>
              <div className={'flex items-center'}>
                <div onClick={() => setVisible(false)} />
              </div>
              <div>{props.title}</div>
              <div />
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
