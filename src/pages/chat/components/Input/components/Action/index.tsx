import React from 'react';
import Picture from './components/Picture';
import Emoji from './components/Emoji';
import ShortcutReply from './components/ShortcutReply';
import styles from './index.less';

const Index: React.FC = () => {
  return React.useMemo(() => {
    return (
      <div className={styles.action}>
        <Emoji />
        <Picture />
        <ShortcutReply />
      </div>
    );
  }, []);
};
export default Index;
