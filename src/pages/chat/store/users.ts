import { proxy, proxyMap } from '@umijs/max';
import { proxyWithDevtools } from '@@/exports';
import { isDev } from '@/utils';
import { getUsers } from '@/services';

const store = proxy({
  users: proxyMap<number, API.User>(new Map()),
  addUser(u: API.User) {
    store.users.set(u.id, u);
  },
  getUser(id: number) {
    return store.users.get(id);
  },
  updateUser(id: number, data: Partial<API.User>) {
    const u = store.users.get(id);
    if (!u) {
      return;
    }
    store.users.set(u.id, {
      ...u,
      ...data,
    });
  },
  removeUser(u: API.User) {
    store.users.delete(u.id);
  },
  async fetchUsers() {
    return getUsers().then((res) => {
      const map = new Map<number, API.User>();
      res.data.forEach((v) => {
        map.set(v.id, v);
      });
      store.users = proxyMap(map);
    });
  },
});
proxyWithDevtools(store, {
  name: 'users',
  enabled: isDev(),
});
export default store;
