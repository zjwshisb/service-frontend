import { proxy, ref } from '@umijs/max';
import { getToken, removeToken } from '@/utils/auth';
import { Modal, message } from 'antd';
import { history } from '@@/core/history';
import { createMsg } from '@/pages/chat/util';
import currentUser from './currentUser';
import admins from './admin';
import users from './users';
import { handleRead } from '@/services';
import waitingUsers from './waitingUsers';
import transfer from './transfer';
import adminSetting from './adminSetting';
import { proxyWithDevtools } from '@@/exports';
import { isDev } from '@/utils';

const store = proxy<{
  websocket?: WebSocket;
  connect: () => void;
  sendAction: (action: API.SendMessageAction) => boolean;
  send: (content: string, type: API.MessageType) => Promise<boolean>;
  close: () => void;
}>({
  websocket: undefined,
  async send(content: string, type: API.MessageType): Promise<boolean> {
    if (currentUser.current) {
      const res = await createMsg(content, currentUser.current.id, type);
      return store.sendAction(res);
    } else {
      message.error('当前无聊天对象，无法发送').then();
      return Promise.reject(new Error('当前无聊天对象，无法发送'));
    }
  },
  sendAction(action: API.SendMessageAction) {
    if (store.websocket) {
      try {
        store.websocket.send(JSON.stringify(action));
        const msg = action.data;
        msg.avatar = adminSetting.setting?.avatar?.thumb_url || '';
        currentUser.unshiftMessage(msg);
        const user = users.getUser(msg.user_id);
        if (user) {
          users.updateUser(user.id, {
            last_message: msg,
            last_chat_time: msg.received_at,
          });
        }
        // 2秒后没有收到回执则把消息状态改成发送失败
        setTimeout(() => {
          currentUser.updateMsgStatus(msg.req_id, false);
        }, 2000);
        currentUser.sendCount += 1;
        return true;
      } catch (e) {
        return false;
      }
    } else {
      Modal.error({
        title: '提示',
        content: '聊天服务器已断开',
        okText: '重新连接连接聊天服务器',
        onOk() {
          window.location.reload();
        },
      });
      return false;
    }
  },
  close() {
    store.websocket?.close(0);
  },
  connect() {
    const url = `${WS_URL}?token=${getToken()}`;
    const ws = new WebSocket(url);
    ws.onopen = () => {
      Modal.destroyAll();
    };
    ws.onerror = () => {
      message.error('连接服务器失败').then();
    };
    ws.onmessage = (e: MessageEvent) => {
      try {
        if (e.data !== '') {
          const action: API.Action = JSON.parse(e.data);
          switch (action.action) {
            case 'admins':
              admins.setAdmins(action.data);
              break;
            case 'user-offline': {
              users.updateUser(action.data.user_id, {
                online: false,
                platform: '',
              });
              break;
            }
            case 'user-online': {
              users.updateUser(action.data.user_id, {
                online: true,
                platform: action.data.platform,
              });
              break;
            }
            case 'error-message': {
              Modal.error({
                title: '提示',
                content: action.data,
              });
              break;
            }
            case 'more-than-one': {
              Modal.error({
                title: '提示',
                content: '请勿打开多个客服页面',
                okText: '关闭',
                onOk() {
                  history.push('/');
                },
              });
              break;
            }
            case 'other-login': {
              Modal.error({
                title: '提示',
                content: '账户已在别处登录',
                okText: '重新登录',
                onOk() {
                  removeToken();
                  history.push('/login');
                },
              });
              break;
            }
            case 'receive-message': {
              const msg = action.data;
              const user = users.getUser(msg.user_id);
              if (user) {
                users.updateUser(user.id, {
                  last_message: msg,
                });
                if (user.id !== currentUser.current?.id) {
                  users.updateUser(user.id, {
                    unread: user.unread + 1,
                  });
                }
              }
              if (msg.user_id === currentUser.current?.id) {
                handleRead(currentUser.current?.id, msg.id).then();
                currentUser.unshiftMessage(msg);
              }
              break;
            }
            case 'read': {
              for (const x of action.data) {
                currentUser.updateMessage(x, {
                  is_read: true,
                });
              }
              break;
            }
            case 'receipt': {
              currentUser.updateMessage(action.data.req_id, {
                is_success: true,
                id: action.data.msg_id,
              });
              break;
            }
            case 'user-transfer': {
              transfer.setTransfers(action.data);
              break;
            }
            case 'waiting-users': {
              waitingUsers.setWaitingUsers(action.data);
              break;
            }
            default: {
            }
          }
        }
      } catch (err) {}
    };
    // 服务器断开连接会触发该事件/连接服务器失败触发error事件后也会触发该事件
    ws.onclose = (e) => {
      if (e.code !== 0) {
        store.websocket = undefined;
        Modal.error({
          title: '提示',
          content: '聊天服务器已断开',
          okText: '重新连接连接聊天服务器',
          onOk() {
            window.location.reload();
          },
        });
      }
    };
    store.websocket = ref(ws);
  },
});
proxyWithDevtools(store, {
  name: 'websocket',
  enabled: isDev(),
});
export default store;
