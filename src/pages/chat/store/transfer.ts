import { proxy } from '@umijs/max';
import { proxyWithDevtools } from '@@/exports';
import { isDev } from '@/utils';

const store = proxy<{
  transfers: API.Transfer[];
  user?: API.User;
  visible: boolean;
  setTransfers: (transfers: API.Transfer[]) => void;
  setUser: (user?: API.User) => void;
  setVisible: (visible: boolean) => void;
}>({
  transfers: [],
  visible: false,
  setTransfers(transfers: API.Transfer[]) {
    store.transfers = transfers;
  },
  setUser(user?: API.User) {
    store.user = user;
  },
  setVisible(visible: boolean) {
    store.visible = visible;
  },
});
proxyWithDevtools(store, {
  name: 'transfer',
  enabled: isDev(),
});

export default store;
