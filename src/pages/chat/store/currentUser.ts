import { proxy, proxyWithDevtools, subscribeKey } from '@umijs/max';
import { isDev } from '@/utils';
const PERSIST_KEY = 'current_user';

const persistCurrent = localStorage.getItem(PERSIST_KEY);

const store = proxy<{
  current?: API.CurrentChatUser;
  detailShow: boolean;
  setCurrent: (user?: API.CurrentChatUser) => void;
  updateCurrent: (user: Partial<API.CurrentChatUser>) => void;
  triggerShow: (open?: boolean) => void;
  unshiftMessage: (message: API.Message) => void;
  concatMessages: (messages: API.Message[]) => void;
  updateMessage: (id: number | string, message: Partial<API.Message>) => void;
  updateMsgStatus: (reqId: string, bool: boolean) => void;
  removeMessage: (id: number | string) => API.Message | null;
  sendCount: number;
}>({
  sendCount: 0,
  current: persistCurrent ? JSON.parse(persistCurrent) : undefined,
  detailShow: true,
  setCurrent(user?: API.CurrentChatUser) {
    if (!user) {
      store.current = undefined;
    } else {
      store.current = {
        ...user,
      };
    }
  },
  updateCurrent(user: Partial<API.CurrentChatUser>) {
    if (store.current !== undefined) {
      store.current = {
        ...store.current,
        ...user,
      };
    }
  },
  triggerShow(open?: boolean) {
    store.detailShow = open ?? !store.detailShow;
  },
  unshiftMessage(msg: API.Message) {
    if (store.current?.id === msg.user_id) {
      store.current.messages.unshift(msg);
    }
  },
  concatMessages(messages: API.Message[]) {
    if (store.current) {
      store.current.messages = store.current.messages.concat(messages);
    }
  },
  updateMessage(id: number | string, message: Partial<API.Message>) {
    if (store.current) {
      const index = store.current.messages.findIndex((item) => {
        return item.id === id || item.req_id === id;
      });
      if (index !== -1) {
        store.current.messages[index] = {
          ...store.current.messages[index],
          ...message,
        };
      }
    }
  },
  updateMsgStatus(reqId: string, bool: boolean) {
    if (store.current) {
      const index = store.current.messages.findIndex((item) => {
        return item.req_id === reqId;
      });
      if (index !== -1 && store.current.messages[index].is_success === undefined) {
        store.current.messages[index]['is_success'] = bool;
      }
    }
  },
  removeMessage(id: number | string): API.Message | null {
    if (store.current) {
      const index = store.current.messages.findIndex((item) => {
        return item.id === id || item.req_id === id;
      });
      if (index !== -1) {
        return store.current.messages.splice(index, 1)[0];
      }
    }
    return null;
  },
});
proxyWithDevtools(store, {
  name: 'currentUser',
  enabled: isDev(),
});
subscribeKey(store, 'current', (c) => {
  if (c) {
    localStorage.setItem(PERSIST_KEY, JSON.stringify(c));
  } else {
    localStorage.removeItem(PERSIST_KEY);
  }
});
export default store;
