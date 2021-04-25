import React from 'react';
import Picture from './components/Picture';
import Emoji from './components/Emoji';
import styles from './index.less';

const Index: React.FC = () => {
  return React.useMemo(() => {
    return (
      <div className={styles.action}>
        <Emoji />
        <Picture />
      </div>
    );
  }, []);
};
export default Index;
