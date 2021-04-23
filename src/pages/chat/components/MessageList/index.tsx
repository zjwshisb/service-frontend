import React from 'react';
import MessageItem from './components/Item/index';
import { useModel } from '@@/plugin-model/useModel';
import { Alert } from 'antd';
import styles from './index.less';

// 默认渲染条数
const pageSize = 20;

/**
 * 聊天列表组件
 * 消息分页，防止数量过多切换时渲染卡顿
 * @constructor
 */
const Index: React.FC = () => {
  const { current } = useModel('useCurrentModel');
  const ref = React.useRef<HTMLDivElement>(null);

  const [messages, setMessages] = React.useState<APP.Message[]>([]);
  const [offset, setOffset] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [bottomDis, setBottomDis] = React.useState(0);

  // 切换当前聊天用户
  // 接受到当前聊天用户的消息
  // 给当前聊天用户发送消息
  // 消息列表重新渲染
  React.useEffect(() => {
    if (current) {
      setBottomDis(0);
      const { length } = current.messages;
      if (length <= pageSize) {
        setMessages(current.messages);
      } else {
        const off = length - pageSize;
        setOffset(off);
        setMessages(current.messages.slice(off));
      }
    }
  }, [current]);

  // 滚动加载更多聊天消息
  const onScroll = React.useCallback(
    (e: React.UIEvent<HTMLElement>) => {
      const el = e.target as HTMLDivElement;
      const top = el.scrollTop;
      const scrollBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (!loading && top < 30 && offset > 0) {
        setBottomDis(scrollBottom);
        setLoading(true);
        setMessages((prevState) => {
          if (current && offset > 0) {
            let start = 0;
            if (offset - pageSize > 0) {
              start = offset - pageSize;
            }
            setOffset(start);
            return current.messages.slice(start, offset).concat(prevState);
          }
          return prevState;
        });
        setLoading(false);
      }
    },
    [loading, offset, current],
  );

  // 消息列表渲染条数变化时，滚动条到底部的距离保持不变
  React.useLayoutEffect(() => {
    if (ref.current != null) {
      const { scrollHeight, clientHeight } = ref.current;
      const maxScrollTop = scrollHeight - clientHeight - bottomDis;
      ref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [bottomDis, messages]);

  return (
    <div className={styles.list} ref={ref} onScroll={onScroll}>
      {messages.map((v) => {
        return <MessageItem message={v} key={v.req_id} />;
      })}
      {current?.disabled && (
        <div className={'disabled-notice'}>
          <Alert type={'warning'} message={'已过失效，无法交谈'} />
        </div>
      )}
    </div>
  );
};
export default Index;
