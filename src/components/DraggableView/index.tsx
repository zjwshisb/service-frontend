import React from 'react';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import { Icon } from '@iconify/react';
import { Button } from 'antd';
import ReactDom from 'react-dom';

const Index: React.FC<
  React.PropsWithChildren<{
    trigger: (visible: boolean) => React.ReactNode;
    triggerClass?: string;
    width?: string;
    top?: string;
    left?: string;
    defaultVisible?: boolean;
    title?: string;
    container?: Element;
  }>
> = (props) => {
  const [visible, setVisible] = React.useState(() => {
    if (props.defaultVisible === undefined) {
      return true;
    }
    return props.defaultVisible;
  });

  const { top = '200px', left = '200px' } = props;

  return (
    <div>
      <div className={props.triggerClass} onClick={() => setVisible((prevState) => !prevState)}>
        {props.trigger(visible)}
      </div>
      {ReactDom.createPortal(
        <Draggable handle={'.header'}>
          <div
            className={classNames('fixed bg-white rounded overflow-hidden', {
              hidden: !visible,
            })}
            style={{ width: props.width, top, left }}
          >
            <div
              className={`flex text-sm cursor-move header px-2 bg-[#F5F5F5FF]  justify-between items-center`}
            >
              <div className={'text-[#000000E0]'}>{props.title}</div>
              <div className={'text-lg'}>
                <Button
                  size={'small'}
                  type={'text'}
                  onClick={() => {
                    setVisible(false);
                  }}
                >
                  <Icon icon={'mdi:close'}></Icon>
                </Button>
              </div>
            </div>
            <div>{props.children}</div>
          </div>
        </Draggable>,
        props.container || document.body,
      )}
    </div>
  );
};

export default Index;
