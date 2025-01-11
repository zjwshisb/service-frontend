import { useMount } from 'ahooks';
import { useModel } from '@umijs/max';
import lodash from 'lodash';
import { handleRead } from '@/services';
import { App } from 'antd';

export function useRegisterMessageEvent() {
  const { setOnMessage } = useModel('chat.websocket');
  const { getUser, updateUser } = useModel('chat.users');
  const { setCurrent } = useModel('chat.currentUser');

  const { modal } = App.useApp();

  useMount(() => {
    setOnMessage((action: API.Action<string>) => {
      modal.error({
        title: '提示',
        content: action.data,
      });
    }, 'error-message');

    setOnMessage((action: API.Action<API.Receipt>) => {
      setCurrent((prev) => {
        if (action.data.user_id === prev?.id) {
          const newUser = lodash.cloneDeep(prev);
          const index = newUser.messages.findIndex((v) => v.req_id === action.data.req_id);
          if (index > -1) {
            newUser.messages[index].is_success = true;
            newUser.messages[index].id = action.data.msg_id;
          }
          return newUser;
        }
        return prev;
      });
    }, 'receipt');

    setOnMessage((action: API.Action<API.Message>) => {
      const msg = action.data;
      setCurrent((prevState) => {
        if (msg.user_id === prevState?.id) {
          handleRead(prevState.id, msg.id).then();
          const newState = lodash.cloneDeep(prevState);
          newState.messages.unshift(msg);
          return newState;
        }
        const user = getUser(msg.user_id);
        if (user) {
          user.last_message = msg;
          if (user.id !== prevState?.id) {
            user.unread += 1;
          }
          updateUser(user);
        }
        return prevState;
      });
    }, 'receive-message');

    setOnMessage((action: API.Action<number[]>) => {
      setCurrent((prev) => {
        if (prev) {
          const newStat = lodash.cloneDeep(prev);
          newStat.messages = newStat.messages.map((v) => {
            if (v.id && action.data.includes(v?.id)) {
              v.is_read = true;
            }
            return v;
          });
          return newStat;
        }
        return undefined;
      });
    }, 'read');
  });
}
