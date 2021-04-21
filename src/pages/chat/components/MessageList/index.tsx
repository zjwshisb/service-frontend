import React from 'react';
import MessageItem from './components/Item/index';
import { useModel } from '@@/plugin-model/useModel';
import { Alert } from 'antd';
import styles from './index.less';

const Index: React.FC = () => {
  const { current } = useModel('useCurrentModel');
  const users = useModel('useUsersModel');
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (ref.current != null) {
      const { scrollHeight, clientHeight } = ref.current;
      const maxScrollTop = scrollHeight - clientHeight;
      ref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  });
  return (
    <div className={styles.list} ref={ref}>
      {users.users.get(current)?.messages.map((v) => {
        if (v.type === 'text') {
          return <MessageItem message={v} key={v.req_id} />;
        }
        return <></>;
      })}
      {users.users.get(current)?.disabled && (
        <div className={'disabled-notice'}>
          <Alert type={'warning'} message={'已过失效，无法交谈'} />
        </div>
      )}
    </div>
  );
};
export default Index;
