import { getChatSetting } from '@/services';
import { proxy } from '@umijs/max';
import { proxyWithDevtools } from '@@/exports';
import { isDev } from '@/utils';

const store = proxy<{
  setting: API.AdminChatSetting | undefined;
  fetchSetting: () => void;
}>({
  setting: undefined,
  fetchSetting: () => {
    getChatSetting().then((res) => {
      store.setting = res.data;
    });
  },
});
proxyWithDevtools(store, {
  name: 'adminSetting',
  enabled: isDev(),
});
export default store;
