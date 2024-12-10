import React from 'react';
import { useModel } from '@umijs/max';

export default function useRemoveUser() {
  const { removeUser } = useModel('chat.users');
  const { current, setCurrent } = useModel('chat.currentUser');
  return React.useCallback(
    (user: API.User) => {
      if (current && current.id === user.id) {
        setCurrent(undefined);
      } else {
        removeUser(user);
      }
    },
    [current, removeUser, setCurrent],
  );
}