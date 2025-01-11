import React from 'react';
import Users from './components/Users';
import Messages from './components/Messages';
import InputArea from './components/Input/index';
import Header from './components/Header';
import LeftMenu from '@/pages/chat/components/LeftMenu/index';
import { useModel } from '@umijs/max';
import { getUsers } from '@/services';
import BackgroundImg from '@/assets/images/background.png';
import Draggable from 'react-draggable';
import useAutoAccept from '@/pages/chat/hooks/useAutoAccept';
import { PageContainer } from '@ant-design/pro-components';
import { useRegisterStatusEvent } from './hooks/useRegisterStatusEvent';
import { useRegisterMessageEvent } from '@/pages/chat/hooks/useRegisterMessageEvent';
import CurrentUser from './components/CurrentUser';

const chatWidth = 1080;
const chatHeight = 700;

const Index: React.FC = () => {
  const { connect, close } = useModel('chat.websocket');
  const { setUsers } = useModel('chat.users');

  const { setting, fetchSetting } = useModel('chat.adminSetting');

  useRegisterStatusEvent();
  useRegisterMessageEvent();

  React.useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);

  const { requestPermission } = useModel('chat.notification');

  // 请求浏览器通知
  React.useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useAutoAccept();

  React.useEffect(() => {
    getUsers().then((res) => {
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
  }, [close, connect, setUsers]);

  return (
    <PageContainer
      title={false}
      pageHeaderRender={false}
      token={{
        paddingBlockPageContainerContent: 0,
        paddingInlinePageContainerContent: 0,
      }}
    >
      <div
        id="chat"
        className={
          'flex items-center justify-center  h-screen overflow-hidden bg-cover bg-no-repeat '
        }
        style={{ backgroundImage: `url(${setting?.background?.url || BackgroundImg})` }}
      >
        <Draggable handle={'#header'}>
          <div
            className={'flex rounded relative'}
            style={{ width: `${chatWidth}px`, height: `${chatHeight}px` }}
          >
            <LeftMenu />
            <div
              className={'w-[280px] h-full flex-shrink-0 border-r border-[#e1e1e1] bg-[#f7f7f7]'}
            >
              <Users />
            </div>
            <div className={'flex flex-1 flex-col h-full bg-white'}>
              <Header />
              <div className={'w-full flex-1 flex flex-row  overflow-hidden'}>
                <div className={'flex-1 flex-col flex bg-[#f3f3f3]'}>
                  <Messages />
                  <InputArea />
                </div>
              </div>
            </div>
            <CurrentUser />
          </div>
        </Draggable>
      </div>
    </PageContainer>
  );
};
export default Index;
