import React from 'react';

export default function () {
  const [admins, setAdmins] = React.useState<API.Admin[]>([]);
  return {
    admins,
    setAdmins,
  };
}
