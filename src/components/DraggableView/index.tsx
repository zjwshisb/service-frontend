import React from 'react';
import Draggable from 'react-draggable';
import { DragOutlined } from '@ant-design/icons/lib';
import style from './index.less';

const Index: React.FC<{
  trigger: (visible: boolean) => React.ReactNode;
  triggerClass?: string;
  width?: string;
}> = (props) => {
  const [visible, setVisible] = React.useState(true);
  return (
    <div>
      <div className={props.triggerClass} onClick={() => setVisible((prevState) => !prevState)}>
        {props.trigger(visible)}
      </div>
      <Draggable handle={'.icon'}>
        <div className={style.index} style={{ width: props.width }} data-display={visible}>
          <div className={style.header}>
            <div className={style.left}>
              <div className={style.dot} onClick={() => setVisible(false)} />
            </div>
            <div className={style.right}>
              <DragOutlined size={16} id={'drag'} className={`${style.drag} icon`} />
            </div>
          </div>
          <div>{props.children}</div>
        </div>
      </Draggable>
    </div>
  );
};
Index.defaultProps = {
  width: '300px',
};
export default Index;
