import React, { useCallback } from 'react';
import Item from './components/Item';
import { useModel } from '@umijs/max';
import { Spin } from 'antd';
import { getMessages } from '@/services';
import Empty from './components/Empty';
import Notice from './components/Notice';
import lodash from 'lodash';
import { If, Then, Else, When } from 'react-if';
import CusDiv from '@/components/CusDiv';

const pageSize = 50;

/**
 * 聊天列表组件
 */
const MessageList: React.FC = () => {
  const { current, setCurrent, top } = useModel('chat.currentUser');

  const ref = React.useRef<HTMLDivElement>(null);

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
    if (res.data.length < pageSize) {
      setNoMore(true);
    } else {
      setNoMore(false);
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
      if (prevUser && prevUser.id === current.id) {
        // 当前用户没有变化
        // setMessages(current.messages.slice(0, offset.current));
      } else {
        fetchMessages(current.id).then((msgs) => {
          setCurrent((prevState) => {
            if (prevState) {
              const newState = lodash.cloneDeep(prevState);
              newState.messages = msgs;
              return newState;
            }
            return prevState;
          });
        });
      }
    }
  }, [current, fetchMessages, setCurrent]);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [top]);

  // 滚动加载更多聊天消息
  const onScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.target as HTMLDivElement;
      const { scrollHeight, scrollTop, clientHeight } = el;
      // 滚动到顶部30个像素触发
      if (scrollHeight + scrollTop - clientHeight <= 30) {
        if (current && current.messages.length >= 20 && !loading) {
          if (!noMore) {
            setLoading(true);
            let mid;
            if (current.messages.length > 0) {
              const lastMessage = current.messages[current.messages.length - 1];
              mid = lastMessage.id;
            }
            const moreMsg = await fetchMessages(current.id, mid);
            setCurrent((prevState) => {
              if (prevState) {
                const newState = lodash.cloneDeep(prevState);
                newState.messages = [...prevState.messages].concat(moreMsg);
                return newState;
              }
              return prevState;
            });
            setLoading(false);
          }
        }
      }
    },
    [current, fetchMessages, loading, noMore, setCurrent],
  );

  const messagesView = React.useMemo(() => {
    if (current) {
      console.log(current.messages.length);
      const { length } = current.messages;
      return current?.messages.map((v, index) => {
        return (
          <Item
            message={v}
            key={v.source + v.req_id}
            prev={index + 1 < length ? current.messages[index + 1] : undefined}
          />
        );
      });
    }
    return <></>;
  }, [current]);

  return (
    <CusDiv
      className={'flex flex-1 flex-col-reverse p-2.5 bg-[#f5f5f5] border-b'}
      ref={ref}
      onScroll={onScroll}
    >
      <If condition={current !== undefined}>
        <Then>
          <When condition={loading}>
            <div className={'text-center'}>
              <Spin />
            </div>
          </When>
          <When condition={current?.disabled}>
            <Notice>已失效，无法发送消息</Notice>
          </When>
          {messagesView}
          <When condition={current && noMore}>
            <Notice>没有更多了</Notice>
          </When>
        </Then>
        <Else>
          <Empty />
        </Else>
      </If>
    </CusDiv>
  );
};
export default MessageList;
