import React from 'react';
import styles from '../../index.less';
import { MessageOutlined } from '@ant-design/icons/lib';
import { useModel } from '@@/plugin-model/useModel';
import { Drawer } from 'antd';

const Index = () => {
  const { waitingUsers } = useModel('useWaitingUserModel');
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={styles.leftItem} onClick={() => setVisible(true)} data-active={visible}>
      <Drawer
        placement={'left'}
        visible={visible}
        onClose={(e) => {
          setVisible(false);
          e.stopPropagation();
        }}
      ></Drawer>
      <MessageOutlined />
      <span className={styles.count}>{waitingUsers.length}</span>人待接入
    </div>
  );
};
export default Index;
