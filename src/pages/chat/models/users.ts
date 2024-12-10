import { useMap } from 'ahooks';
import React from 'react';

/**
 * 聊天用户map
 */
export default function () {
  const [users, usersAction] = useMap<number, API.User>(new Map());

  const updateUser = React.useCallback(
    (user: API.User) => {
      usersAction.set(user.id, user);
    },
    [usersAction],
  );

  const addUser = React.useCallback(
    (user: API.User) => {
      usersAction.set(user.id, user);
    },
    [usersAction],
  );

  const removeUser = React.useCallback(
    (user: API.User) => {
      usersAction.remove(user.id);
    },
    [usersAction],
  );

  return {
    users: users,
    addUser,
    updateUser,
    setUsers: usersAction.setAll,
    getUser: usersAction.get,
    removeUser,
  };
}