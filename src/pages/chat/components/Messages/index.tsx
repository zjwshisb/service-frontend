import React, { useCallback } from 'react';
import Item from './components/Item';
import { useSnapshot } from '@umijs/max';
import { Spin } from 'antd';
import { getMessages } from '@/services';
import Empty from './components/Empty';
import Notice from './components/Notice';
import { Else, If, Then, When } from 'react-if';
import CusDiv from '@/components/CusDiv';
import currentUser from '@/pages/chat/store/currentUser';
import usersStore from '@/pages/chat/store/users';

const pageSize = 50;

/**
 * 聊天列表组件
 */
const MessageList: React.FC = () => {
  const { current, setCurrent, updateCurrent, concatMessages, sendCount } =
    useSnapshot(currentUser);

  const ref = React.useRef<HTMLDivElement>(null);

  const { users, getUser, updateUser } = useSnapshot(usersStore);

  const [loading, setLoading] = React.useState(false);

  const [noMore, setNoMore] = React.useState(false);

  React.useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [sendCount]);

  const fetchMessages = React.useCallback(async (uid: number, mid?: number) => {
    let res: API.Response<API.Message[]>;
    setLoading(true);
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
    setTimeout(() => {
      setLoading(false);
    }, 300);
    return res.data;
  }, []);

  React.useEffect(() => {
    if (current?.id) {
      fetchMessages(current.id).then((messages) => {
        updateCurrent({
          messages: messages,
        });
      });
    }
  }, [current?.id, fetchMessages, updateCurrent]);

  // 从localStorage加载当前聊天用户时
  // 处理可能出现的数据不一致
  React.useEffect(() => {
    if (current?.id && users.size > 0) {
      const u = getUser(current.id);
      if (!u) {
        setCurrent(undefined);
      } else {
        if (u.disabled !== current.disabled || u.username !== current.username) {
          updateCurrent({
            disabled: u.disabled,
            username: u.username,
          });
          setTimeout(() => {
            updateUser(current.id, {
              unread: 0,
            });
          }, 5000);
        }
      }
    }
  }, [
    current?.disabled,
    current?.id,
    current?.username,
    getUser,
    setCurrent,
    updateCurrent,
    updateUser,
    users.size,
  ]);

  // 滚动加载更多聊天消息
  const onScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.target as HTMLDivElement;
      const { scrollHeight, scrollTop, clientHeight } = el;
      // 滚动到顶部30个像素触发
      if (scrollHeight + scrollTop - clientHeight <= 30) {
        if (current && !loading && !noMore) {
          let mid;
          if (current.messages.length > 0) {
            const lastMessage = current.messages[current.messages.length - 1];
            mid = lastMessage.id;
          }
          const moreMsg = await fetchMessages(current.id, mid);
          concatMessages(moreMsg);
        }
      }
    },
    [concatMessages, current, fetchMessages, loading, noMore],
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
    <CusDiv className={'flex flex-1 flex-col-reverse p-2.5 border-b'} ref={ref} onScroll={onScroll}>
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
          <When condition={current && noMore && !loading}>
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
