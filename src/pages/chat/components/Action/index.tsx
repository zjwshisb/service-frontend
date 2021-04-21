import React from 'react';
import { SmileOutlined } from '@ant-design/icons/lib';
import styles from './index.less';

const Index: React.FC = () => {
  return (
    <div className={styles.action}>
      <SmileOutlined style={{ fontSize: '30px' }} />
    </div>
  );
};
export default Index;
