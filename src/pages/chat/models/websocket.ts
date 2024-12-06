import React from 'react';
import { getToken, removeToken } from '@/utils/auth';
import lodash from 'lodash';
import { App, Modal } from 'antd';
import { useModel } from '@umijs/max';
import { history } from '@@/core/history';
import { createMsg } from '../util';

export type ActionHandle<T = any> = (action: API.Action<T>) => void;
export type EventHandle<T extends Event = Event> = (e: T) => void;

export default function () {
  const [websocket, setWebsocket] = React.useState<WebSocket | undefined>();

  const [onSend, setOnSend] = React.useState<ActionHandle | undefined>();

  const [onMessage, updateOnMessage] = React.useState<Map<API.ActionType, ActionHandle>>(new Map());

  const [onOpen, setOnOpen] = React.useState<EventHandle>();

  const [onError, setOnError] = React.useState<EventHandle>();

  const [isShowNotice, setIsShowNotice] = React.useState(false);

  const { getUser, updateUser } = useModel('chat.users');
  const { setCurrent, current } = useModel('chat.currentUser');

  const { message } = App.useApp();

  const connect = React.useCallback(() => {
    const url = `${WS_URL}?token=${getToken()}`;
    setWebsocket(new WebSocket(url));
  }, []);

  React.useEffect(() => {
    if (websocket) {
      websocket.onopen = (e) => {
        message.success('连接聊天服务器成功');
        Modal.destroyAll();
        if (onOpen) {
          onOpen(e);
        }
      };
      websocket.onerror = (e: Event) => {
        message.error('连接服务器失败');
        if (onError) {
          onError(e);
        }
      };
      websocket.onmessage = (e: MessageEvent) => {
        try {
          if (e.data !== '') {
            const action: API.Action = JSON.parse(e.data);
            const handle = onMessage.get(action.action);
            if (handle) {
              handle(action);
            }
          }
        } catch (err) {}
      };
      // 服务器断开连接会触发该事件/连接服务器失败触发error事件后也会触发该事件
      websocket.onclose = () => {
        if (!isShowNotice) {
          Modal.error({
            title: '提示',
            content: '服务器连接已断开',
            onOk() {
              window.location.reload();
            },
          });
        }
        setWebsocket(undefined);
      };
    }
  }, [connect, isShowNotice, message, onError, onMessage, onOpen, websocket]);

  const setOnMessage = React.useCallback(
    <T>(callback: ActionHandle<T>, type: API.ActionType): void => {
      updateOnMessage((prevState) => {
        const newState = lodash.clone(prevState);
        newState.set(type, callback);
        return newState;
      });
    },
    [],
  );

  const close = React.useCallback(() => {
    setWebsocket((ws) => {
      ws?.close();
      return undefined;
    });
  }, []);

  React.useEffect(() => {
    setOnMessage(() => {
      Modal.error({
        title: '提示',
        content: '账户已在别处登录',
        okText: '重新登录',
        onOk() {
          removeToken();
          history.push('/login');
        },
      });
    }, 'other-login');
    setOnMessage(() => {
      setIsShowNotice(true);
      Modal.error({
        title: '提示',
        content: '请勿打开多个客服页面',
        okText: '关闭',
        onOk() {
          history.push('/');
        },
      });
    }, 'more-than-one');
  }, [setOnMessage]);

  React.useEffect(() => {}, [websocket]);

  const sendAction: (msg: API.Action<API.Message>) => boolean = React.useCallback(
    (action: API.Action<API.Message>) => {
      if (websocket) {
        try {
          websocket.send(JSON.stringify(action));
          // 2秒后没有收到回执则把消息状态改成发送失败
          setTimeout(() => {
            setCurrent((user) => {
              if (user && user.id === action.data.user_id) {
                const newUser = lodash.clone(user);
                const { length } = newUser.messages;
                for (let i = 0; i < length; i += 1) {
                  if (newUser.messages[i].req_id === action.data.req_id) {
                    if (newUser.messages[i].is_success === undefined) {
                      newUser.messages[i].is_success = false;
                      break;
                    }
                  }
                }
                return newUser;
              }
              return user;
            });
            const user = getUser(action.data.user_id);
            if (user !== undefined) {
              const index = user.messages.findIndex((v) => v.req_id === action.data.req_id);
              if (index > -1) {
                if (user.messages[index].is_success === undefined) {
                  user.messages[index].is_success = false;
                }
              }
              updateUser(user);
            }
          }, 2000);
          if (onSend) {
            onSend(action);
          }
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
    [getUser, onSend, setCurrent, updateUser, websocket],
  );

  const send: (content: string, type: API.MessageType) => Promise<boolean> = React.useCallback(
    async (content: string, type: API.MessageType) => {
      if (current) {
        const res = await createMsg(content, current.id, type);
        return sendAction(res);
      } else {
        message.error('当前无聊天对象，无法发送').then();
        return Promise.reject(new Error('当前无聊天对象，无法发送'));
      }
    },
    [current, message, sendAction],
  );

  return {
    connect,
    send,
    setOnSend,
    setOnMessage,
    setOnOpen,
    setOnError,
    websocket,
    close,
  };
}
