import React, { useCallback } from 'react';
import Item from './components/Item';
import { useModel } from '@umijs/max';
import { Spin } from 'antd';
import { getMessages } from '@/services';
import Empty from './components/Empty';
import Notice from './components/Notice';
import lodash from 'lodash';
import { Else, If, Then, When } from 'react-if';
import CusDiv from '@/components/CusDiv';

const pageSize = 50;

/**
 * 聊天列表组件
 */
const MessageList: React.FC = () => {
  const { current, setCurrent } = useModel('chat.currentUser');

  const ref = React.useRef<HTMLDivElement>(null);

  const { getUser, updateUser } = useModel('chat.users');

  const { setting } = useModel('chat.adminSetting');
  const [loading, setLoading] = React.useState(false);

  const [noMore, setNoMore] = React.useState(false);

  const { setOnSend } = useModel('chat.websocket');

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

  // 当前用户变化
  React.useEffect(() => {
    if (current?.id) {
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
  }, [current?.id, fetchMessages, setCurrent]);

  React.useEffect(() => {
    setOnSend(() => {
      return (action: API.Action<API.Message>) => {
        const msg = action.data;
        msg.avatar = setting?.avatar?.thumb_url || '';
        setCurrent((prevState) => {
          if (prevState?.id === action.data.user_id) {
            const newState = lodash.cloneDeep(prevState);
            newState.messages.unshift(msg);
            return newState;
          }
          return prevState;
        });
        const user = getUser(msg.user_id);
        if (user) {
          user.last_message = msg;
          user.last_chat_time = msg.received_at;
          updateUser(user);
        }
        if (ref.current) {
          ref.current.scrollTop = 0;
        }
      };
    });
  }, [getUser, setCurrent, setOnSend, setting?.avatar?.thumb_url, updateUser]);

  // 滚动加载更多聊天消息
  const onScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.target as HTMLDivElement;
      const { scrollHeight, scrollTop, clientHeight } = el;
      // 滚动到顶部30个像素触发
      if (scrollHeight + scrollTop - clientHeight <= 30) {
        if (current && !loading && !noMore) {
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
              newState.messages = prevState.messages.concat(moreMsg);
              return newState;
            }
            return prevState;
          });
          setLoading(false);
        }
      }
    },
    [current, fetchMessages, loading, noMore, setCurrent],
  );

  const messagesView = React.useMemo(() => {
    if (current) {
      const { length } = current.messages;
      return current?.messages.map((v, index) => {
        return (
          <Item
            message={v}
            key={v.req_id}
            prev={index + 1 < length ? current.messages[index + 1] : undefined}
          />
        );
      });
    }
    return <></>;
  }, [current]);

  return (
    <CusDiv
      className={'flex flex-1 flex-col-reverse p-2.5 border-b border-[#e1e1e1]'}
      ref={ref}
      onScroll={onScroll}
    >
      <If condition={current !== undefined}>
        <Then>
          <When condition={current?.disabled}>
            <Notice>已失效，无法发送消息</Notice>
          </When>
          {messagesView}
          <When condition={loading}>
            <div className={'text-center mt-1'}>
              <Spin />
            </div>
          </When>
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
