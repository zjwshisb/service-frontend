import React from 'react';

export default function useAdminModel() {
  const [admins, setAdmins] = React.useState<API.Admin[]>([]);
  return {
    admins,
    setAdmins,
  };
}
