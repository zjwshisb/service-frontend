import React from 'react';
import MessageItem from './components/Item/index';
import { useModel } from '@@/plugin-model/useModel';
import { Alert, Spin } from 'antd';
import styles from './index.less';
import { getMessages } from '@/services';
import Empty from './components/Empty/Index';

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

  const [noMore, setNoMore] = React.useState(false);

  // 保存上一帧的聊天对象
  const userRef = React.useRef<APP.User>();

  const fetchMessages = React.useCallback(async (uid: number, mid?: number) => {
    let res: API.Response<APP.Message[]>;
    if (mid) {
      res = await getMessages(uid, mid);
    } else {
      res = await getMessages(uid);
    }
    if (res.data.length <= 0) {
      setNoMore(true);
    }
    return res.data.reverse();
  }, []);

  // 切换当前聊天用户
  // 接受到当前聊天用户的消息
  // 给当前聊天用户发送消息
  React.useEffect(() => {
    const prevUser = userRef.current;
    userRef.current = current;
    if (current) {
      const { length } = current.messages;
      if (prevUser && prevUser.id === current.id) {
        setOffset((prevState) => {
          setMessages(current.messages.slice(prevState));
          return prevState;
        });
        setScrollBottom(0);
      } else {
        let os = 0;
        if (length <= 0) {
          setLoading(true);
          fetchMessages(current.id).then((m) => {
            setMessages(m);
            setLoading(false);
          });
        } else if (length <= pageSize) {
          setMessages(current.messages);
        } else {
          os = length - pageSize;
          setMessages(current.messages.slice(os));
        }
        setOffset(os);
        setNoMore(false);
        setScrollBottom(0);
      }
    } else {
      setMessages([]);
    }
  }, [current, fetchMessages]);

  // 滚动加载更多聊天消息
  const onScroll = React.useCallback(
    async (e: React.UIEvent<HTMLElement>) => {
      const el = e.target as HTMLDivElement;
      const top = el.scrollTop;
      const scrollBot = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (current) {
        setScrollBottom(scrollBot);
        if (!loading && top < 30) {
          setLoading(true);
          if (offset > 0) {
            // 从本地加载
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
          } else if (!noMore) {
            // 从服务器加载
            let mid;
            if (messages.length > 0) {
              const firstMessage = messages[0];
              mid = firstMessage.id;
            }
            const moreMsg = await fetchMessages(current.id, mid);
            setMessages((prevState) => {
              return moreMsg.concat(prevState);
            });
          }
          setLoading(false);
        }
      }
    },
    [current, loading, offset, noMore, messages, fetchMessages],
  );

  // 消息列表渲染条数变化时，滚动条到底部的距离保持不变
  React.useLayoutEffect(() => {
    if (ref.current != null) {
      const { scrollHeight, clientHeight } = ref.current;
      const scrollTop = scrollHeight - clientHeight - scrollBottom;
      ref.current.scrollTop = scrollTop > 0 ? scrollTop : 0;
    }
  }, [scrollBottom, messages]);

  return (
    <div className={styles.list} ref={ref} onScroll={onScroll}>
      {current === undefined ? (
        <Empty />
      ) : (
        <>
          {loading && (
            <div className={styles.loading}>
              <Spin />
            </div>
          )}
          {current && offset === 0 && noMore && <div className={styles.nomore}>没有更多了</div>}
          {messages.map((v) => {
            return <MessageItem message={v} key={v.req_id} />;
          })}
          {current?.disabled && (
            <div className={'disabled-notice'}>
              <Alert type={'warning'} message={'已过失效，无法交谈'} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Index;
