import React from "react";

export default function useUsersModel() {

  const [users, setUsers] = React.useState<APP.User[]>([
    {
      id: 1,
      name: 'test',
      messages: [],
      lastTime: 10000,
      isOnline: true
    }
  ])

  return {
    users,
    setUsers,
  }
}
