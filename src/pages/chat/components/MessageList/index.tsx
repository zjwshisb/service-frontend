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
  const [scrollBottom, setScrollBottom] = React.useState(0);

  // 保存上一帧的聊天对象
  const userRef = React.useRef<APP.User>();

  // 切换当前聊天用户
  // 接受到当前聊天用户的消息
  // 给当前聊天用户发送消息
  React.useEffect(() => {
    const prevUser = userRef.current;
    if (current) {
      userRef.current = current;
      const { length } = current.messages;
      if (prevUser && prevUser.id === current.id) {
        setOffset((prevState) => {
          setMessages(current.messages.slice(prevState));
          return prevState;
        });
        setScrollBottom(0);
      } else {
        let os = 0;
        if (length <= pageSize) {
          setMessages(current.messages);
        } else {
          os = length - pageSize;
          setMessages(current.messages.slice(os));
        }
        setOffset(os);
        setScrollBottom(0);
      }
    }
  }, [current]);

  // 滚动加载更多聊天消息
  const onScroll = React.useCallback(
    (e: React.UIEvent<HTMLElement>) => {
      const el = e.target as HTMLDivElement;
      const top = el.scrollTop;
      const scrollBot = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (!loading && top < 30 && offset > 0) {
        setScrollBottom(scrollBot);
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
      const maxScrollTop = scrollHeight - clientHeight - scrollBottom;
      ref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [scrollBottom, messages]);

  return React.useMemo(() => {
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
  }, [current?.disabled, messages, onScroll]);
};
export default Index;
