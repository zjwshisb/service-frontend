import React from 'react';
import useAccept from '@/hooks/useAcceptUser';
import { useModel } from '@@/plugin-model/useModel';

export default function useAutoAccept() {
  const accept = useAccept();

  const { waitingUsers } = useModel('useWaitingUserModel');

  const { setting } = useModel('useSettingModel');

  React.useEffect(() => {
    if (setting?.is_auto_accept) {
      const i = setInterval(() => {
        if (waitingUsers.length > 0) {
          accept(waitingUsers[0].session_id);
        }
      }, 3000);
      return () => clearInterval(i);
    }
    return () => {};
  }, [accept, setting?.is_auto_accept, waitingUsers]);
}
