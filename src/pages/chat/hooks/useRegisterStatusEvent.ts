import { useMount } from 'ahooks';
import { useModel } from '@umijs/max';

export function useRegisterStatusEvent() {
  const { setOnMessage } = useModel('chat.websocket');
  const { getUser, updateUser } = useModel('chat.users');
  useMount(() => {
    setOnMessage((action: API.Action<API.OffLine>) => {
      const user = getUser(action.data.user_id);
      if (user) {
        user.online = false;
        user.platform = '';
        updateUser(user);
      }
    }, 'user-offline');

    setOnMessage((action: API.Action<API.OnLine>) => {
      const user = getUser(action.data.user_id);
      if (user) {
        user.online = true;
        user.platform = action.data.platform;
        updateUser(user);
      }
    }, 'user-online');
  });
}
