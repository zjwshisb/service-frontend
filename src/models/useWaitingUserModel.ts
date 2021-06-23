import React from 'react';

export default function useWaitingUserModel() {
  const [waitingUsers, setWaitingUsers] = React.useState<API.WaitingUser[]>([]);
  const [visible, setVisible] = React.useState(false);

  const trigger = React.useCallback(() => {
    setVisible((prevState) => !prevState);
  }, []);

  return {
    waitingUsers,
    setWaitingUsers,
    visible,
    trigger,
  };
}
