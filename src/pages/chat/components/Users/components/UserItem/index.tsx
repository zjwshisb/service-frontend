import React from 'react';
import { Avatar, Badge, Typography } from 'antd';
import { useSnapshot } from '@umijs/max';
import Menu from './components/Menu';
import classNames from 'classnames';
import { formatTime } from '@/utils/utils';
import { getMessageTypeLabel } from '@/pages/chat/util';
import Platform from './components/Platform';
import currentUser from '@/pages/chat/store/currentUser';
import userStore from '@/pages/chat/store/users';

const UserItem: React.FC<{
  user: API.User;
}> = ({ user }) => {
  const { setCurrent, current } = useSnapshot(currentUser);
  const { updateUser } = useSnapshot(userStore);

  const onClick = React.useCallback(() => {
    setCurrent({
      id: user.id,
      avatar: user.avatar,
      messages: [],
      disabled: user.disabled,
      username: user.username,
    });
    updateUser(user.id, {
      unread: 0,
    });
  }, [setCurrent, updateUser, user]);

  return (
    <div
      className={classNames('flex min-h-[70px] p-2', {
        'bg-[#e1e1e1] ': current && current.id === user.id,
      })}
      onClick={onClick}
    >
      <div
        className={classNames('flex-shrink-0 w-[50px] h-[50px]', {
          'opacity-40': !user.online,
        })}
      >
        <Badge count={user.unread} size={'small'}>
          <Avatar size={50} shape="square" src={user.avatar}>
            {user.username}
          </Avatar>
        </Badge>
      </div>
      <div className={'flex-1 ml-2 overflow-hidden'}>
        <div className={'w-full flex items-center justify-between'}>
          <div className={'flex-1 overflow-hidden pr-2 flex items-center'}>
            <Typography.Text ellipsis={true} className={'text-sm leading-4'}>
              {user.username}
            </Typography.Text>
          </div>

          {user.last_message && (
            <div className={'flex-shrink-0 flex items-center w-[110px] justify-end'}>
              <Typography.Text ellipsis={true} className={'text-xs text-gray-500'}>
                {formatTime(user.last_message?.received_at)}
              </Typography.Text>
            </div>
          )}
        </div>
        <Platform platform={user.platform}></Platform>
        <div className={'flex justify-between text-[#888] mt-1'}>
          <div className={'flex-1 overflow-hidden flex items-center'}>
            <Typography.Text ellipsis={true} className={'text-xs leading-3 text-gray-500'}>
              {user.last_message &&
                getMessageTypeLabel(user.last_message.content, user.last_message.type)}
            </Typography.Text>
          </div>
          <div className={'flex-shrink-0 w-[100px]'}>
            <Menu user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserItem;
