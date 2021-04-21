import React from 'react';
import './index.less';
import Action from './components/Action/index';
import Input from './components/Input/index';
import UserList from './components/UserList/index';
import MessageList from './components/MessageList/index';
import WaitingUser from './components/WaitingUser/index';
import Menu from './components/Menu/index';
import { useModel } from 'umi';
import lodash from 'lodash';
import { message } from 'antd';
import { handleRead } from '@/services';
import styles from './index.less';

const Index: React.FC = () => {
  const { connect, setOnMessage, setOnSend, setOnClose, setOnError, setOnOpen } = useModel(
    'useWebsocketModel',
  );
  const { setUsers } = useModel('useUsersModel');
  const { setWaitingUsers } = useModel('useWaitingUserModel');
  const { current } = useModel('useCurrentModel');

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
        setUsers((prevState) => {
          const newState = lodash.cloneDeep(prevState);
          const user = newState.get(action.data.user_id);
          if (user) {
            user.messages.push(action.data);
            return newState;
          }
          return prevState;
        });
      };
    });
  }, [setOnSend, setUsers]);

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.UserList>) => {
      setUsers(() => {
        const map = new Map<number, APP.User>();
        action.data.list.forEach((v) => {
          map.set(v.id, v);
        });
        return map;
      });
    }, 'server-user-list');
  }, [setOnMessage, setUsers]);

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.Receipt>) => {
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
    }, 'receipt');
  }, [setOnMessage, setUsers]);

  React.useEffect(() => {
    setOnMessage((action: APP.Action<{ list: APP.WaitingUser[] }>) => {
      if (action.action === 'waiting-users') {
        setWaitingUsers(action.data.list);
      }
    }, 'waiting-users');
  }, [setOnMessage, setWaitingUsers]);

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.Message>) => {
      const msg = action.data;
      setUsers((prevState) => {
        const newState = lodash.cloneDeep(prevState);
        const user = newState.get(msg.user_id);
        if (user) {
          user.messages.push(action.data);
          if (current !== user.id) {
            user.unread += 1;
          } else {
            handleRead(current).catch();
          }
          return newState;
        }
        return prevState;
      });
    }, 'message');
  }, [current, setOnMessage, setUsers]);

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.OnLine>) => {
      setUsers((prevState) => {
        if (prevState.get(action.data.user_id)) {
          const newState = lodash.cloneDeep(prevState);
          const user = newState.get(action.data.user_id);
          if (user) {
            user.online = true;
            message.success(`${user.username}上线啦`).then();
          }
          return newState;
        }
        return prevState;
      });
    }, 'user-online');
  }, [setOnMessage, setUsers]);

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.OffLine>) => {
      setUsers((prevState) => {
        if (prevState.get(action.data.user_id)) {
          const newState = lodash.cloneDeep(prevState);
          const user = newState.get(action.data.user_id);
          if (user) {
            user.online = false;
            message.info(`${user.username}下线啦`).then();
          }
          return newState;
        }
        return prevState;
      });
    }, 'user-offline');
  }, [setOnMessage, setUsers]);

  React.useEffect(() => {
    connect();
  }, [connect]);

  return (
    <div className={styles.chat_container}>
      <div className={styles.chat}>
        <div className={styles.title}>
          <div className={styles.left}>
            <WaitingUser />
          </div>
          <div className={styles.right}>
            <Menu />
          </div>
        </div>
        <div className={styles.body}>
          <UserList />
          <div className={styles.message}>
            <MessageList />
            <Action />
            <Input />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
