import React from 'react';
import { App, Avatar, List, Popover, Space, Typography } from 'antd';
import classNames from 'classnames';
import { formatTime } from '@/utils/utils';
import { getMessageTypeLabel } from '@/pages/chat/util';
import Platform from '../../../Users/components/UserItem/components/Platform';
import useAcceptUser from '@/pages/chat/hooks/useAcceptUser';
import { cancelChatSessions } from '@/services';

const UserItem: React.FC<{
  user: API.WaitingUser;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({ user, onClick }) => {
  const lastMessage = React.useMemo(() => {
    if (user.messages.length > 0) {
      return user.messages[user.messages.length - 1];
    }
    return null;
  }, [user.messages]);

  const accept = useAcceptUser();

  const { modal } = App.useApp();

  const reject = React.useCallback(() => {
    modal.confirm({
      title: '提示',
      content: '确定拒绝该会话?',
      async onOk() {
        await cancelChatSessions(user.session_id);
      },
    });
  }, [modal, user.session_id]);

  return (
    <Popover
      overlayInnerStyle={{
        padding: 0,
      }}
      title={
        <div>
          <List
            style={{
              padding: 0,
            }}
            dataSource={user.messages}
            size={'small'}
            renderItem={(v) => {
              return (
                <List.Item>
                  <div className={'w-24'}>{formatTime(v.time)}</div>
                  <div className={'max-w-48'}>
                    <Typography.Text ellipsis={true}>
                      {getMessageTypeLabel(v.content, v.type)}
                    </Typography.Text>
                  </div>
                </List.Item>
              );
            }}
          ></List>
        </div>
      }
      placement={'right'}
    >
      <div
        onClick={onClick}
        className={classNames('flex min-h-[70px] w-[280px] p-2 hover:bg-[#e1e1e1]')}
      >
        <div className={classNames('flex-shrink-0 w-[50px] h-[50px]')}>
          <Avatar size={50} shape="square" src={user.avatar}>
            {user.username}
          </Avatar>
        </div>
        <div className={'flex-1 ml-2 overflow-hidden'}>
          <div className={'w-full flex items-center justify-between'}>
            <div className={'flex-1 overflow-hidden pr-2 flex items-center'}>
              <Typography.Text ellipsis={true} className={'text-sm leading-4'}>
                {user.username}
              </Typography.Text>
            </div>

            {lastMessage && (
              <div className={'flex-shrink-0 flex items-center w-[110px] justify-end'}>
                <Typography.Text ellipsis={true} className={'text-xs text-gray-500'}>
                  {formatTime(lastMessage.time)}
                </Typography.Text>
              </div>
            )}
          </div>
          <Platform platform={'app'}></Platform>
          <div className={'flex justify-between mt-1'}>
            <div className={'flex-1 overflow-hidden flex items-center'}>
              <Typography.Text ellipsis={true} className={'text-xs leading-3 text-gray-500'}>
                {lastMessage && getMessageTypeLabel(lastMessage.content, lastMessage.type)}
              </Typography.Text>
            </div>
            <div className={'flex-shrink-0 w-[100px] text-right text-xs'}>
              <Space>
                <a className={'text-red-400'} onClick={reject}>
                  拒绝
                </a>
                <a onClick={() => accept(user.session_id)}>接入</a>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  );
};
export default UserItem;
