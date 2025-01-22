import React from 'react';
import { useSnapshot } from '@umijs/max';
import currentUser from '@/pages/chat/store/currentUser';
import users from '@/pages/chat/store/users';

export default function useRemoveUser() {
  const { setCurrent, current } = useSnapshot(currentUser);
  const { removeUser } = useSnapshot(users);
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
