import React from 'react';
import './index.less';
import UserList from './components/UserList/index';
import MessageList from './components/MessageList/index';
import InputArea from './components/Input/index';
import Header from './components/Header/index';
import Menu from './components/Menu/index';
import { useModel } from 'umi';
import lodash from 'lodash';
import { message } from 'antd';
import { handleRead, getUsers } from '@/services';
import styles from './index.less';

const Index: React.FC = () => {
  const { connect, setOnMessage, setOnSend, setOnClose, setOnError, setOnOpen } = useModel(
    'useWebsocketModel',
  );
  const { setUsers } = useModel('useUsersModel');
  const { setWaitingUsers } = useModel('useWaitingUserModel');
  const { current, setCurrent } = useModel('useCurrentModel');
  const initialState = useModel('@@initialState');

  React.useEffect(() => {
    setOnOpen(() => () => {
      message.success('连接聊天服务器成功').then();
    });
    setOnClose(() => () => {
      // connect()
    });
  }, [setOnOpen, setOnError, setOnClose]);

  React.useEffect(() => {
    setOnSend(() => {
      return (action: APP.Action<APP.Message>) => {
        const avatar = initialState.initialState?.currentUser?.avatar || '';
        const msg = action.data;
        msg.avatar = avatar;
        if (current && current.id === action.data.user_id) {
          setCurrent((prevState) => {
            current.last_chat_time = msg.received_at;
            if (prevState) {
              const newState = lodash.cloneDeep(prevState);
              newState.messages.push(msg);
              return newState;
            }
            return prevState;
          });
        } else {
          setUsers((prevState) => {
            const newState = lodash.cloneDeep(prevState);
            const user = newState.get(msg.user_id);
            if (user) {
              user.messages.push(msg);
              return newState;
            }
            return prevState;
          });
        }
      };
    });
  }, [current, initialState.initialState?.currentUser?.avatar, setCurrent, setOnSend, setUsers]);

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.Receipt>) => {
      if (action.data.user_id === current?.id) {
        setCurrent((user) => {
          if (user) {
            const newUser = lodash.cloneDeep(user);
            const index = newUser.messages.findIndex((v) => v.req_id === action.data.req_id);
            if (index > -1) {
              newUser.messages[index].is_success = true;
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
              user.messages[index].is_success = true;
            }
            return lodash.cloneDeep(prevState);
          }
          return prevState;
        });
      }
    }, 'receipt');
  }, [current?.id, setCurrent, setOnMessage, setUsers]);

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.WaitingUser[]>) => {
      if (action.action === 'waiting-users') {
        setWaitingUsers(action.data);
      }
    }, 'waiting-users');
  }, [setOnMessage, setWaitingUsers]);

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.Message>) => {
      const msg = action.data;
      if (msg.user_id === current?.id) {
        setCurrent((prevState) => {
          if (prevState) {
            const newState = lodash.cloneDeep(prevState);
            newState.messages.push(msg);
            handleRead(msg.user_id).then();
            return newState;
          }
          return prevState;
        });
      } else {
        setUsers((prevState) => {
          const newState = lodash.clone(prevState);
          const user = newState.get(msg.user_id);
          if (user) {
            user.messages.push(action.data);
            user.unread += 1;
            return newState;
          }
          return prevState;
        });
      }
    }, 'receive-message');
  }, [current, setCurrent, setOnMessage, setUsers]);

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.OnLine>) => {
      setCurrent((prevState) => {
        if (action.data.user_id === prevState?.id) {
          const newState = lodash.cloneDeep(prevState);
          newState.online = true;
          return newState;
        }
        return prevState;
      });
      setUsers((prevState) => {
        if (prevState.get(action.data.user_id)) {
          const newState = lodash.cloneDeep(prevState);
          const user = newState.get(action.data.user_id);
          if (user) {
            user.online = true;
          }
          return newState;
        }
        return prevState;
      });
    }, 'user-online');
  }, [setCurrent, setOnMessage, setUsers]);

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.OffLine>) => {
      setCurrent((prevState) => {
        if (action.data.user_id === prevState?.id) {
          const newState = lodash.cloneDeep(prevState);
          newState.online = false;
          return newState;
        }
        return prevState;
      });
      setUsers((prevState) => {
        if (prevState.get(action.data.user_id)) {
          const newState = lodash.cloneDeep(prevState);
          const user = newState.get(action.data.user_id);
          if (user) {
            user.online = false;
          }
          return newState;
        }
        return prevState;
      });
    }, 'user-offline');
  }, [setCurrent, setOnMessage, setUsers]);

  React.useEffect(() => {
    getUsers().then((res) => {
      setUsers(() => {
        const map = new Map<number, APP.User>();
        res.data.forEach((v) => {
          map.set(v.id, v);
        });
        connect();
        return map;
      });
    });
  }, [connect, setUsers]);

  return (
    <div className={styles.chat_container}>
      <div className={styles.chat}>
        <div className={styles.left}>
          <Menu />
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.body}>
            <UserList />
            <div className={styles.message}>
              <MessageList />
              <InputArea />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
