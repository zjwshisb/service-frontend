import { proxy } from '@umijs/max';
import { proxyWithDevtools } from '@@/exports';
import { isDev } from '@/utils';
import { notify } from '@/pages/chat/notification';

const store = proxy<{
  waitingUsers: API.WaitingUser[];
  setWaitingUsers: (waitingUsers: API.WaitingUser[]) => void;
}>({
  waitingUsers: [],
  setWaitingUsers(waitingUsers: API.WaitingUser[]) {
    if (waitingUsers.length > store.waitingUsers.length) {
      notify('有新的用户待接入');
    }
    store.waitingUsers = waitingUsers;
  },
});
proxyWithDevtools(store, {
  name: 'waitingUsers',
  enabled: isDev(),
});
export default store;
