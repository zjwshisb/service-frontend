import React from 'react';

export default function useServiceUserModel() {
  const [users, setUsers] = React.useState<APP.ServiceUser[]>([]);

  return {
    users,
    setUsers,
  };
}
