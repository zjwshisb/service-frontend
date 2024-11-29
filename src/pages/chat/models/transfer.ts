import React from 'react';

export default function () {
  const [transfers, setTransfers] = React.useState<API.Transfer[]>([]);

  const [user, setUser] = React.useState<API.User>();

  const [visible, setVisible] = React.useState(false);

  return {
    transfers,
    setTransfers,
    user,
    setUser,
    visible,
    setVisible,
  };
}
