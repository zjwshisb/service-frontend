import React from 'react';
import Menu from './components/Menu';
import styles from './index.less';

const Index: React.FC = () => {
  return (
    <>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <Menu />
      </div>
    </>
  );
};
export default Index;
