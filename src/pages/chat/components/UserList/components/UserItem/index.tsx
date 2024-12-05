import React from 'react';
import { Avatar, Badge } from 'antd';
import { useModel } from '@umijs/max';
import lodash from 'lodash';
import LastTime from './components/LastTime';
import LastMessage from './components/LastMessage';
import Menu from './components/Menu/index';
import { handleRead } from '@/services';
import classNames from 'classnames';

const Index: React.FC<{
  user: API.User;
}> = ({ user }) => {
  const { setCurrent, current, goTop } = useModel('chat.currentUser');
  const { removeUser, addUser } = useModel('chat.users');

  const onClick = React.useCallback(() => {
    if (user.unread > 0) {
      user.unread = 0;
      if (user.messages.length > 0) {
        handleRead(user.id, user.messages[0].id).then().catch();
      } else {
        handleRead(user.id).then().catch();
      }
    }
    if (current) {
      addUser(current);
    }
    removeUser(user);
    setCurrent(lodash.cloneDeep(user));
    goTop();
  }, [addUser, current, goTop, removeUser, setCurrent, user]);

  return (
    <div
      className={classNames('flex w-full min-h-[70px] p-2.5 overflow-hidden', {
        'bg-[#dedede]': current && current.id === user.id,
      })}
      onClick={() => onClick()}
      data-active={current && current.id === user.id}
      data-online={user.online}
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
      <div className={'flex-1 ml-2.5 overflow-hidden'}>
        <div className={'text-nowrap overflow-hidden w-full flex items-center'}>
          <div className={'flex-1 text-lg overflow-hidden text-ellipsis'}>{user.username}</div>
          <div className={'w-24 text-[#acacac] text-sm text-right flex-shrink-0'}>
            {user.last_message && <LastTime time={user.last_message.received_at} />}
          </div>
        </div>
        <div className={'flex justify-between overflow-hidden text-nowrap text-[#888]'}>
          <div className={'flex-1 overflow-hidden text-ellipsis'}>
            {user.last_message && <LastMessage message={user.last_message} />}
          </div>
          <div className={'flex-shrink-0 w-[100px]'}>
            <Menu user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
