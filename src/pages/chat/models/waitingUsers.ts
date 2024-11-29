import React from 'react';

export default function () {
  const [waitingUsers, setWaitingUsers] = React.useState<API.WaitingUser[]>([]);

  return {
    waitingUsers,
    setWaitingUsers,
  };
}
