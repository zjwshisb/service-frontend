import React from 'react';

export default function useWaitingUserModel() {
  const [waitingUsers, setWaitingUsers] = React.useState<API.WaitingUser[]>([]);

  return {
    waitingUsers,
    setWaitingUsers,
  };
}
