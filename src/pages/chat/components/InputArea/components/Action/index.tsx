import React from 'react';
import { SmileOutlined } from '@ant-design/icons/lib';
import Picture from './components/Picture';
import styles from './index.less';

const Index: React.FC = () => {
  return React.useMemo(() => {
    return (
      <div className={styles.action}>
        <SmileOutlined className={'action-icon'} />
        <Picture />
      </div>
    );
  }, []);
};
export default Index;
