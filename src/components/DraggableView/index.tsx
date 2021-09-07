import React from 'react';
import Draggable from 'react-draggable';
import style from './index.less';
import usePortal from '@/hooks/usePortal';

const Index: React.FC<{
  trigger: (visible: boolean) => React.ReactNode;
  triggerClass?: string;
  width?: string;
  top?: string;
  left?: string;
  defaultVisible?: boolean;
  title?: string;
}> = (props) => {
  const [visible, setVisible] = React.useState(() => {
    if (props.defaultVisible === undefined) {
      return true;
    }
    return props.defaultVisible;
  });
  return (
    <div className={style.body}>
      <div className={props.triggerClass} onClick={() => setVisible((prevState) => !prevState)}>
        {props.trigger(visible)}
      </div>
      {usePortal(
        <Draggable handle={'.header'}>
          <div
            className={style.index}
            style={{ width: props.width, top: props.top, left: props.left }}
            data-display={visible}
          >
            <div className={`${style.header} header`}>
              <div className={style.left}>
                <div className={style.dot} onClick={() => setVisible(false)} />
              </div>
              <div className={style.center}>{props.title}</div>
              <div className={style.right}></div>
            </div>
            <div>{props.children}</div>
          </div>
        </Draggable>,
        'chat',
      )}
    </div>
  );
};
Index.defaultProps = {
  width: '300px',
  defaultVisible: true,
};
export default Index;
