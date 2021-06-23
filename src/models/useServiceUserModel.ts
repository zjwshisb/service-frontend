import React from 'react';

export default function useServiceUserModel() {
  const [users, setUsers] = React.useState<API.ServiceUser[]>([]);

  return {
    users,
    setUsers,
  };
}
