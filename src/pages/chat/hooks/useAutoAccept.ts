import React from 'react';
import useAccept from '@/pages/chat/hooks/useAcceptUser';
import { useSnapshot } from '@umijs/max';
import waitingUsers from '@/pages/chat/store/waitingUsers';
import adminSetting from '@/pages/chat/store/adminSetting';

export default function useAutoAccept() {
  const accept = useAccept();

  const store = useSnapshot(waitingUsers);

  const { setting } = useSnapshot(adminSetting);

  React.useEffect(() => {
    if (setting?.is_auto_accept) {
      const i = setInterval(() => {
        if (store.waitingUsers.length > 0) {
          accept(store.waitingUsers[0].session_id);
        }
      }, 3000);
      return () => clearInterval(i);
    }
    return () => {};
  }, [accept, setting?.is_auto_accept, store.waitingUsers]);
}
