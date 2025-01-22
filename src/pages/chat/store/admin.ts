import { proxy, proxyWithDevtools } from '@umijs/max';
import { isDev } from '@/utils';

const store = proxy<{
  admins: API.Admin[];
  setAdmins: (admins: API.Admin[]) => void;
}>({
  admins: [],
  setAdmins(admins: API.Admin[]) {
    store.admins = admins;
  },
});
proxyWithDevtools(store, {
  name: 'admin',
  enabled: isDev(),
});

export default store;
