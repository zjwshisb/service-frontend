import React from "react";

export default function useUsersModel() {
  const [users, setUsers] = React.useState<Map<number,APP.User>>(() => {
    return new Map<number, APP.User>()
  })
  return {
    users,
    setUsers,
  }
}
