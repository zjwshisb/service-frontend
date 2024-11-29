import React from 'react';

/**
 * 聊天用户map
 */
export default function () {
  const [users, setUsers] = React.useState<Map<number, API.User>>(() => {
    return new Map<number, API.User>();
  });
  return {
    users,
    setUsers,
  };
}
