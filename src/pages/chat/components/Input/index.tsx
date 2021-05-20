import React from 'react';
import Action from './components/Action/index';
import Input from './components/Text/index';
import { useModel } from 'umi';
import styles from './index.less';

const Index: React.FC = () => {
  const { current } = useModel('useCurrentModel');

  return React.useMemo(() => {
    return (
      <>
        {current !== undefined && (
          <div className={styles.input}>
            <Action />
            <Input />
            {current.disabled && <div className={styles.disabled} />}
          </div>
        )}
      </>
    );
  }, [current]);
};
export default Index;
