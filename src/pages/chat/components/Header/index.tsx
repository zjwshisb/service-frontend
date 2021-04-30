import React from 'react';
import WaitingUser from './components/WaitingUser';
import ServiceUser from './components/ServiceUser';
import Menu from './components/Menu';
import styles from './index.less';

const Index: React.FC = () => {
  return (
    <>
      <div className={styles.left}>
        <WaitingUser />
        <ServiceUser />
      </div>
      <div className={styles.right}>
        <Menu />
      </div>
    </>
  );
};
export default Index;
