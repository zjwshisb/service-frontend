import React from 'react';
import Action from './components/Action/index';
import Input from './components/Input/index';
import { useModel } from 'umi';
import styles from './index.less';

const Index: React.FC = () => {
  const { users } = useModel('useUsersModel');
  const { current } = useModel('useCurrentModel');

  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    if (!current) {
      setDisabled(true);
      return;
    }
    if (current.disabled) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [current, users]);

  // 当没有选择用户或者当前用户已失效时，用一个透明的遮罩层挡住操作区域
  return (
    <div className={styles.input}>
      <Action />
      <Input />
      {disabled && <div className={styles.shadow} />}
    </div>
  );
};
export default Index;
