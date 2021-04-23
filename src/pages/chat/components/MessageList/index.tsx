import React from 'react';
import MessageItem from './components/Item/index';
import { useModel } from '@@/plugin-model/useModel';
import { Alert } from 'antd';
import styles from './index.less';

const pageSize = 50;

const Index: React.FC = () => {
  const { current } = useModel('useCurrentModel');
  const { users } = useModel('useUsersModel');
  const ref = React.useRef<HTMLDivElement>(null);

  const [messages, setMessages] = React.useState<APP.Message[]>([]);
  const [offset, setOffset] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const [u, setU] = React.useState<APP.User | undefined>(undefined);

  React.useEffect(() => {
    const user = users.get(current);
    if (user) {
      setU(user);
    }
  }, [current, users]);

  const onScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const top = (e.target as HTMLElement).scrollTop;
      if (!loading && top < 30) {
        setLoading(true);
        setMessages((prevState) => {
          if (u && offset > 0) {
            let start = 0;
            if (offset - pageSize > 0) {
              start = offset - pageSize;
            }
            setOffset(start);
            return u.messages.slice(start, offset).concat(prevState);
          }
          setLoading(false);
          return prevState;
        });
      }
    },
    [loading, offset, u],
  );

  React.useEffect(() => {
    if (u) {
      const { length } = u.messages;
      if (length <= pageSize) {
        setMessages(u.messages);
      } else {
        const off = length - pageSize;
        setOffset(off);
        setMessages(u.messages.slice(off));
      }
    }
  }, [u]);

  React.useLayoutEffect(() => {
    if (ref.current != null) {
      const { scrollHeight, clientHeight } = ref.current;
      const maxScrollTop = scrollHeight - clientHeight;
      ref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [u]);

  return (
    <div className={styles.list} ref={ref} onScroll={onScroll}>
      {messages.map((v) => {
        return <MessageItem message={v} key={v.req_id} />;
      })}
      {users.get(current)?.disabled && (
        <div className={'disabled-notice'}>
          <Alert type={'warning'} message={'已过失效，无法交谈'} />
        </div>
      )}
    </div>
  );
};
export default Index;
