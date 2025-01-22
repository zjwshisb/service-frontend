import { getHistorySessions } from '@/services';
import { proxy } from '@umijs/max';
import { proxyWithDevtools } from '@@/exports';
import { isDev } from '@/utils';

const store = proxy<{
  visible: boolean;
  sessions?: API.ChatSession[];
  show(id: number): void;
}>({
  visible: false,
  sessions: undefined,
  show(id: number) {
    store.visible = true;
    getHistorySessions(id).then((res) => {
      store.sessions = res.data;
    });
  },
});
proxyWithDevtools(store, {
  name: 'historySession',
  enabled: isDev(),
});
export default store;
