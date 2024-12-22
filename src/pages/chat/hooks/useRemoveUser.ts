import React from 'react';
import { useModel } from '@umijs/max';

export default function useRemoveUser() {
  const { removeUser } = useModel('chat.users');
  const { setCurrent, getCurrent } = useModel('chat.currentUser');
  return React.useCallback(
    (user: API.User) => {
      if (getCurrent()?.id === user.id) {
        setCurrent(undefined);
      }
      removeUser(user);
    },
    [getCurrent, removeUser, setCurrent],
  );
}
