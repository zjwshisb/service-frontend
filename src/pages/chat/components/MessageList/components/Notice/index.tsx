import React from 'react';
import styles from './index.less';

const Index: React.FC = (props) => {
  return <div className={styles.notice}>{props.children}</div>;
};

export default Index;
