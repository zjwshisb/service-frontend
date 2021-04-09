import React from "react";

export default function useWaitingUserModel() {

  const [waitingUsers, setWaitingUsers] = React.useState<APP.WaitingUser[]>([])
  return {
    waitingUsers,
    setWaitingUsers
  }
}
