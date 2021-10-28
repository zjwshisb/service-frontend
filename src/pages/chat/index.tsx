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
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import useMount from '@/hooks/useMount';

const chatWidth = 1080;
const chatHeight = 700;

const Index: React.FC = () => {
  const { connect, setOnMessage, setOnSend, close } = useModel('useWebsocketModel');
  const { setUsers } = useModel('useUsersModel');
  const { current, setCurrent, goTop } = useModel('useCurrentModel');
  const initialState = useModel('@@initialState');

  const { setting } = useModel('useSettingModel');

  const { notifyMessage, requestPermission } = useModel('useNotificationModel');

  // 请求浏览器通知
  React.useEffect(() => {
    requestPermission();
  }, [requestPermission]);

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

  useMount(() => {
    setOnMessage((action: API.Action<string>) => {
      Modal.error({
        title: '提示',
        content: action.data,
      });
    }, 'error-message');
  });

  useMount(() => {
    setOnMessage((action: API.Action<API.Receipt>) => {
      setCurrent((user) => {
        if (user && action.data.user_id === user.id) {
          const newUser = lodash.clone(user);
          const index = newUser.messages.findIndex((v) => v.req_id === action.data.req_id);
          if (index > -1) {
            newUser.messages[index].is_success = true;
          }
          return newUser;
        }
        return user;
      });
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
    }, 'receipt');
  });

  useMount(() => {
    setOnMessage((action: API.Action<API.Message>) => {
      const msg = action.data;
      setCurrent((prevState) => {
        if (prevState && msg.user_id === prevState.id) {
          goTop();
          handleRead(prevState.id).then();
          const newState = lodash.clone(prevState);
          newState.messages.unshift(msg);
          notifyMessage(newState.username, msg);
          return newState;
        }
        return prevState;
      });
      setUsers((prevState) => {
        const newState = lodash.clone(prevState);
        const user = newState.get(msg.user_id);
        if (user) {
          user.messages.unshift(action.data);
          user.unread += 1;
          notifyMessage(user.username, msg);
          return newState;
        }
        return prevState;
      });
    }, 'receive-message');
  });

  useMount(() => {
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
  });

  useMount(() => {
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
  });

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

  const [style, setStyle] = React.useState({
    width: chatWidth,
    height: chatHeight,
  });

  const handleResize = React.useCallback((e, s) => {
    setStyle({
      width: s.size.width <= chatWidth ? chatWidth : s.size.width,
      height: s.size.height <= chatHeight ? chatHeight : s.size.height,
    });
  }, []);

  return (
    <div id="chat" className={styles.chat_container} style={{ backgroundImage: `url(${bgImg})` }}>
      <Draggable handle={'#header'}>
        <Resizable
          className={'box'}
          height={style.height}
          width={style.width}
          resizeHandles={['s', 'n', 'w']}
          onResize={handleResize}
        >
          <div
            className={styles.chat}
            style={{ width: `${style.width}px`, height: `${style.height}px` }}
          >
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
        </Resizable>
      </Draggable>
    </div>
  );
};
export default Index;
