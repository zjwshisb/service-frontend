import React from 'react';
import { getToken, removeToken } from '@/utils/auth';
import lodash from 'lodash';
import { Modal } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { history } from '@@/core/history';

export type ActionHandle<T = any> = (action: APP.Action<T>) => void;
export type EventHandle<T extends Event = Event> = (e: T) => void;

export default function useWebsocketModel() {
  const [websocket, setWebSocket] = React.useState<WebSocket | undefined>();
  const [onSend, setOnSend] = React.useState<ActionHandle | undefined>();
  const [onMessage, updateOnMessage] = React.useState<Map<APP.ActionType, ActionHandle>>(new Map());
  const [onOpen, setOnOpen] = React.useState<EventHandle>();
  const [onError, setOnError] = React.useState<EventHandle>();
  const [onClose, setOnClose] = React.useState<EventHandle<CloseEvent>>();

  const [hadReConnect, setHadReConnect] = React.useState(false);

  const { setUsers } = useModel('useUsersModel');
  const { current, setCurrent } = useModel('useCurrentModel');

  const connect = React.useCallback(() => {
    setWebSocket(() => {
      const url = `${WS_URL}?token=${getToken()}`;
      return new WebSocket(url);
    });
  }, []);

  React.useEffect(() => {
    if (websocket) {
      websocket.onopen = (e) => {
        if (onOpen) {
          onOpen(e);
        }
      };
      // 连接服务器失败
      websocket.onerror = (e: Event) => {
        if (onError) {
          onError(e);
        }
      };
      websocket.onmessage = (e: MessageEvent) => {
        try {
          if (e.data !== '') {
            const action: APP.Action = JSON.parse(e.data);
            const handle = onMessage.get(action.action);
            if (handle) {
              handle(action);
            }
          }
        } catch (err) {
          console.log(err);
        }
      };
      // 服务器断开连接会触发该事件/连接服务器失败触发error事件后也会触发该事件
      websocket.onclose = () => {
        setWebSocket(undefined);
      };
    }
  }, [connect, hadReConnect, onClose, onError, onMessage, onOpen, websocket]);

  const setOnMessage = React.useCallback(
    <T>(callback: ActionHandle<T>, type: APP.ActionType): void => {
      updateOnMessage((prevState) => {
        const newState = lodash.clone(prevState);
        newState.set(type, callback);
        return newState;
      });
    },
    [],
  );

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

  const send: (msg: APP.Action<APP.Message>) => void = React.useCallback(
    (action: APP.Action<APP.Message>) => {
      if (websocket) {
        try {
          websocket.send(JSON.stringify(action));
          // 2秒后没有收到回执则把消息状态改成发送失败
          setTimeout(() => {
            if (action.data.user_id === current?.id) {
              setCurrent((user) => {
                if (user) {
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
            } else {
              setUsers((prevState) => {
                const user = prevState.get(action.data.user_id);
                if (user !== undefined) {
                  const index = user.messages.findIndex((v) => v.req_id === action.data.req_id);
                  if (index > -1) {
                    if (user.messages[index].is_success === undefined) {
                      user.messages[index].is_success = false;
                    }
                  }
                  return lodash.clone(prevState);
                }
                return prevState;
              });
            }
          }, 2000);
          if (onSend) {
            onSend(action);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        Modal.error({
          title: '提示',
          content: '聊天服务器已断开',
          okText: '重新连接连接聊天服务器',
          onOk() {
            setHadReConnect(true);
            connect();
          },
        });
      }
    },
    [connect, current?.id, onSend, setCurrent, setUsers, websocket],
  );
  return {
    connect,
    send,
    setOnSend,
    setOnMessage,
    setOnOpen,
    setOnError,
    setOnClose,
  };
}
