import React from "react";

export default function useUsersModel() {
  const [users, setUsers] = React.useState<Map<number,APP.User>>(() => {
    const map = new Map<number, APP.User>()
    map.set(1, {
      id: 1,
      name: 'test1',
      messages: [],
      last_send_time: 10000,
      is_online: true,
      unread: 0
    })
    map.set(2,  {
      id: 2,
      name: 'test2',
      messages: [],
      last_send_time: 10000,
      is_online: true,
      unread: 0
    })
    return map
  })
  return {
    users,
    setUsers,
  }
}
