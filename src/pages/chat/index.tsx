import React from 'react';
import UserList from './components/UserList/index';
import MessageList from './components/MessageList/index';
import InputArea from './components/Input/index';
import Header from './components/Header/index';
import Menu from './components/Menu/index';
import { useModel } from '@umijs/max';
import lodash from 'lodash';
import { getUsers, handleRead } from '@/services';
import BackgroundImg from '@/assets/images/background.png';
import { Modal } from 'antd';
import Draggable from 'react-draggable';
import { useMount } from 'ahooks';
import useAutoAccept from '@/pages/chat/hooks/useAutoAccept';
import FileFinder from '@/components/FileFinder';

const chatWidth = 1080;
const chatHeight = 700;

const Index: React.FC = () => {
  const { connect, setOnMessage, setOnSend, close } = useModel('chat.websocket');
  const { getUser, updateUser, users, setUsers } = useModel('chat.users');
  const { current, setCurrent, goTop } = useModel('chat.currentUser');

  const { setting, fetchSetting } = useModel('chat.adminSetting');

  React.useEffect(() => {
    console.log(users);
  }, [users]);

  React.useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);

  const { notifyMessage, requestPermission } = useModel('chat.notification');

  // 请求浏览器通知
  React.useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useAutoAccept();

  React.useEffect(() => {
    setOnSend(() => {
      return (action: API.Action<API.Message>) => {
        const avatar = setting?.avatar?.thumb_url || '';
        const msg = action.data;
        msg.avatar = avatar;
        if (current && current.id === action.data.user_id) {
          goTop();
          setCurrent((prevState) => {
            if (prevState) {
              const newState = lodash.cloneDeep(prevState);
              newState.last_chat_time = msg.received_at;
              newState.messages.unshift(msg);
              newState.last_message = msg;
              return newState;
            }
            return prevState;
          });
        } else {
          const user = getUser(msg.user_id);
          if (user) {
            user.messages.unshift(msg);
            user.last_chat_time = msg.received_at;
            user.last_message = msg;
            updateUser(user);
          }
        }
      };
    });
  }, [current, getUser, goTop, setCurrent, setOnSend, setting?.avatar, updateUser]);

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
          const newUser = lodash.cloneDeep(user);
          const index = newUser.messages.findIndex((v) => v.req_id === action.data.req_id);
          if (index > -1) {
            newUser.messages[index].is_success = true;
          }
          return newUser;
        }
        return user;
      });
      const user = getUser(action.data.user_id);
      if (user !== undefined) {
        const index = user.messages.findIndex((v) => v.req_id === action.data.req_id);
        if (index > -1) {
          user.messages[index].is_success = true;
        }
        updateUser(user);
      }
    }, 'receipt');
  });

  useMount(() => {
    setOnMessage((action: API.Action<API.Message>) => {
      const msg = action.data;
      setCurrent((prevState) => {
        if (prevState && msg.user_id === prevState.id) {
          goTop();
          handleRead(prevState.id, msg.id).then();
          const newState = lodash.cloneDeep(prevState);
          newState.unread = 0;
          newState.messages.unshift(msg);
          notifyMessage(newState.username, msg);
          return newState;
        }
        return prevState;
      });
      const user = getUser(msg.user_id);
      if (user) {
        user.messages.unshift(action.data);
        user.unread += 1;
        updateUser(user);
        notifyMessage(user.username, msg);
      }
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
      const user = getUser(action.data.user_id);
      if (user) {
        user.online = true;
        updateUser(user);
      }
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
      const user = getUser(action.data.user_id);
      if (user) {
        user.online = false;
        updateUser(user);
      }
    }, 'user-offline');
  });

  React.useEffect(() => {
    getUsers().then((res) => {
      setCurrent(undefined);
      const map = new Map<number, API.User>();
      res.data.forEach((v) => {
        map.set(v.id, v);
      });
      connect();
      setUsers(map);
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
    <div
      id="chat"
      className={
        'bg-[#fafafa] flex items-center justify-center  h-screen overflow-hidden bg-cover bg-no-repeat'
      }
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <FileFinder />
      <Draggable handle={'#header'}>
        <div
          className={'flex overflow-hidden rounded'}
          style={{ width: `${chatWidth}px`, height: `${chatHeight}px` }}
        >
          <div className={'items-center w-[60px] h-full bg-[#ebeced]'}>
            <Menu />
          </div>
          <div className={'flex flex-1 flex-col h-full bg-white'}>
            <Header />
            <div className={'flex  w-full flex-1 bg-[#f3f3f3] overflow-hidden'}>
              <UserList />
              <div className={'flex flex-1 flex-col'}>
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
