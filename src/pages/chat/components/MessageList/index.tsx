import React from 'react';
import MessageItem from './components/Item/index';
import { useModel } from '@umijs/max';
import { Spin } from 'antd';
import { getMessages } from '@/services';
import Empty from './components/Empty/index';
import Notice from './components/Notice/index';
import lodash from 'lodash';

// 默认渲染条数
const pageSize = 20;

/**
 * 聊天列表组件
 * 消息分页，防止数量过多切换时渲染卡顿
 * @constructor
 */
const Index: React.FC = () => {
  const { current, setCurrent, top } = useModel('chat.currentUser');

  const ref = React.useRef<HTMLDivElement>(null);

  const [messages, setMessages] = React.useState<API.Message[]>([]);

  const offset = React.useRef(pageSize);

  const [loading, setLoading] = React.useState(false);

  const [noMore, setNoMore] = React.useState(false);

  // 保存上一帧的聊天对象
  const userRef = React.useRef<API.User>();

  const fetchMessages = React.useCallback(async (uid: number, mid?: number) => {
    let res: API.Response<API.Message[]>;
    if (mid) {
      res = await getMessages(uid, mid);
    } else {
      res = await getMessages(uid);
    }
    if (res.data.length <= 0) {
      setNoMore(true);
    }
    return res.data;
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
        // 当前用户没有变化
        setMessages(current.messages.slice(0, offset.current));
      } else {
        offset.current = pageSize;
        if (length < pageSize) {
          getMessages(current.id).then((res) => {
            const msgs = res.data;
            setCurrent((prevState) => {
              if (prevState) {
                const newState = lodash.clone(prevState);
                newState.messages = msgs;
                setMessages(msgs);
                return newState;
              }
              return prevState;
            });
            if (msgs.length < pageSize) {
              setNoMore(true);
            }
          });
        } else {
          setMessages(current.messages.slice(0, offset.current));
        }
        setNoMore(false);
      }
    } else {
      setMessages([]);
    }
  }, [current, fetchMessages, setCurrent]);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [top]);

  // 滚动加载更多聊天消息
  const onScroll = React.useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.target as HTMLDivElement;
      const { scrollHeight, scrollTop, clientHeight } = el;
      // 滚动到顶部30个像素触发
      if (scrollHeight + scrollTop - clientHeight <= 30) {
        if (current && messages.length >= 20 && !loading) {
          setLoading(true);
          if (offset.current < current.messages.length) {
            // 从本地加载
            offset.current += 20;
            setMessages(() => {
              return current.messages.slice(0, offset.current);
            });
          } else if (!noMore) {
            // 从服务器加载
            let mid;
            if (messages.length > 0) {
              const lastMessage = messages[messages.length - 1];
              mid = lastMessage.id;
            }
            const moreMsg = await fetchMessages(current.id, mid);
            if (moreMsg.length > 0) {
              setMessages((prevState) => {
                return [...prevState].concat(moreMsg);
              });
            } else {
              setNoMore(true);
            }
          }
          setLoading(false);
        }
      }
    },
    [current, messages, loading, noMore, fetchMessages],
  );

  const messagesView = React.useMemo(() => {
    const { length } = messages;
    return messages.map((v, index) => {
      return (
        <MessageItem
          message={v}
          key={v.source + v.req_id}
          prev={index + 1 < length ? messages[index + 1] : undefined}
        />
      );
    });
  }, [messages]);

  return (
    <div
      className={'flex  flex-1 flex-col-reverse w-full p-2.5 overflow-y-auto bg-[f5f5f5] border-b'}
      ref={ref}
      onScroll={onScroll}
    >
      {current === undefined ? (
        <Empty />
      ) : (
        <>
          {loading && (
            <div className={'text-center'}>
              <Spin />
            </div>
          )}
          {current?.disabled && <Notice>已失效，无法发送消息</Notice>}
          {messagesView}
          {current && noMore && <Notice>没有更多了</Notice>}
        </>
      )}
    </div>
  );
};
export default Index;
