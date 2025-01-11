import React from 'react';
import { useModel } from '@umijs/max';

export default function useRemoveUser() {
  const { removeUser } = useModel('chat.users');
  const { setCurrent, current } = useModel('chat.currentUser');
  return React.useCallback(
    (user: API.User) => {
      if (current?.id === user.id) {
        setCurrent(undefined);
      }
      removeUser(user);
    },
    [current, removeUser, setCurrent],
  );
}
