import React from 'react';
import styles from './index.less';
import { MessageOutlined } from '@ant-design/icons/lib';
import { useModel } from '@@/plugin-model/useModel';

const Index = () => {
  const { waitingUsers, trigger } = useModel('useWaitingUserModel');

  return (
    <div className={styles.index} onClick={trigger}>
      <MessageOutlined />
      <span className={styles.count}>{waitingUsers.length}</span>人待接入
    </div>
  );
};
export default Index;
