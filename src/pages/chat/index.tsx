import React from 'react';
import './index.less';
import UserList from './components/UserList/index';
import MessageList from './components/MessageList/index';
import InputArea from './components/Input/index';
import Header from './components/Header/index';
import Menu from './components/Menu/index';
import { useModel } from 'umi';
import lodash from 'lodash';
import { getUsers, handleRead } from '@/services';
import styles from './index.less';
import BackgroundImg from '@/assets/images/background.png';
import { Modal } from 'antd';
import Draggable from 'react-draggable';

const Index: React.FC = () => {
  const { connect, setOnMessage, setOnSend, close } = useModel('useWebsocketModel');
  const { setUsers } = useModel('useUsersModel');
  const { current, setCurrent, goTop } = useModel('useCurrentModel');
  const initialState = useModel('@@initialState');

  const { setting } = useModel('useSettingModel');

  React.useEffect(() => {
    setOnMessage((action: API.Action<string>) => {
      Modal.error({
        title: '提示',
        content: action.data,
      });
    }, 'error-message');
  }, [setOnMessage]);

  React.useEffect(() => {
    setOnSend(() => {
      return (action: API.Action<API.Message>) => {
        const avatar = initialState.initialState?.currentUser?.avatar || '';
        const msg = action.data;
        msg.avatar = avatar;
        if (current && current.id === action.data.user_id) {
          goTop();
          setCurrent((prevState) => {
            if (prevState) {
              const newState = lodash.cloneDeep(prevState);
              newState.last_chat_time = msg.received_at;
              newState.messages.unshift(msg);
              return newState;
            }
            return prevState;
          });
        } else {
          setUsers((prevState) => {
            const newState = lodash.cloneDeep(prevState);
            const user = newState.get(msg.user_id);
            if (user) {
              user.messages.unshift(msg);
              user.last_chat_time = msg.received_at;
              return newState;
            }
            return prevState;
          });
        }
      };
    });
  }, [
    current,
    goTop,
    initialState.initialState?.currentUser?.avatar,
    setCurrent,
    setOnSend,
    setUsers,
  ]);

  React.useEffect(() => {
    setOnMessage((action: API.Action<API.Receipt>) => {
      if (action.data.user_id === current?.id) {
        setCurrent((user) => {
          if (user) {
            const newUser = lodash.clone(user);
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
            return lodash.clone(prevState);
          }
          return prevState;
        });
      }
    }, 'receipt');
  }, [current?.id, goTop, setCurrent, setOnMessage, setUsers]);

  React.useEffect(() => {
    setOnMessage((action: API.Action<API.Message>) => {
      const msg = action.data;
      if (msg.user_id === current?.id) {
        goTop();
        handleRead(current.id).then();
        setCurrent((prevState) => {
          if (prevState) {
            const newState = lodash.clone(prevState);
            newState.messages.unshift(msg);
            return newState;
          }
          return prevState;
        });
      } else {
        setUsers((prevState) => {
          const newState = lodash.clone(prevState);
          const user = newState.get(msg.user_id);
          if (user) {
            user.messages.unshift(action.data);
            user.unread += 1;
            return newState;
          }
          return prevState;
        });
      }
    }, 'receive-message');
  }, [current, goTop, setCurrent, setOnMessage, setUsers]);

  React.useEffect(() => {
    setOnMessage((action: API.Action<API.OnLine>) => {
      setCurrent((prevState) => {
        if (action.data.user_id === prevState?.id) {
          const newState = lodash.clone(prevState);
          newState.online = true;
          return newState;
        }
        return prevState;
      });
      setUsers((prevState) => {
        if (prevState.get(action.data.user_id)) {
          const newState = lodash.clone(prevState);
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
    setOnMessage((action: API.Action<API.OffLine>) => {
      setCurrent((prevState) => {
        if (action.data.user_id === prevState?.id) {
          const newState = lodash.clone(prevState);
          newState.online = false;
          return newState;
        }
        return prevState;
      });
      setUsers((prevState) => {
        if (prevState.get(action.data.user_id)) {
          const newState = lodash.clone(prevState);
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
      setCurrent(undefined);
      setUsers(() => {
        const map = new Map<number, API.User>();
        res.data.forEach((v) => {
          map.set(v.id, v);
        });
        connect();
        return map;
      });
    });
    return () => {
      close();
    };
  }, [close, connect, setCurrent, setUsers]);

  const [bgImg, setBgImg] = React.useState(() => {
    return BackgroundImg;
  });

  React.useEffect(() => {
    if (setting?.background) {
      setBgImg(setting?.background);
    } else {
      setBgImg(BackgroundImg);
    }
  }, [setting]);

  return (
    <div id="chat" className={styles.chat_container} style={{ backgroundImage: `url(${bgImg})` }}>
      <Draggable handle={'#header'}>
        <div className={styles.chat}>
          <div className={styles.left}>
            <Menu />
          </div>
          <div className={styles.right}>
            <div className={styles.header} id={'header'}>
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
      </Draggable>
    </div>
  );
};
export default Index;
