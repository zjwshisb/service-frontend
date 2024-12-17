import React from 'react';
import { Avatar, Badge, Typography } from 'antd';
import { useModel } from '@umijs/max';
import lodash from 'lodash';
import LastTime from './components/LastTime';
import LastMessage from './components/LastMessage';
import Menu from './components/Menu/index';
import classNames from 'classnames';

const UserItem: React.FC<{
  user: API.User;
}> = ({ user }) => {
  const { setCurrent, current, goTop } = useModel('chat.currentUser');
  const { removeUser, addUser } = useModel('chat.users');

  const onClick = React.useCallback(() => {
    if (current) {
      addUser(current);
    }
    removeUser(user);
    setCurrent(lodash.cloneDeep(user));
    goTop();
  }, [addUser, current, goTop, removeUser, setCurrent, user]);

  return (
    <div
      className={classNames('flex w-full min-h-[70px] p-2.5', {
        'bg-[#dedede]': current && current.id === user.id,
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
          <Typography.Text ellipsis={true}>{user.username}</Typography.Text>
          <div className={'w-24 text-[#acacac] text-sm text-right flex-shrink-0'}>
            {user.last_message && <LastTime time={user.last_message.received_at} />}
          </div>
        </div>
        <div className={'flex justify-between text-[#888] mt-1'}>
          <Typography.Text ellipsis={true}>
            {user.last_message && <LastMessage message={user.last_message} />}
          </Typography.Text>
          <div className={'flex-shrink-0 w-[100px]'}>
            <Menu user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserItem;
