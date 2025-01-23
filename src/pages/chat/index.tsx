import React from 'react';
import Users from './components/Users';
import Messages from './components/Messages';
import InputArea from './components/Input/index';
import Header from './components/Header';
import LeftMenu from '@/pages/chat/components/LeftMenu/index';
import { useSnapshot } from '@umijs/max';
import BackgroundImg from '@/assets/images/background.png';
import Draggable from 'react-draggable';
import useAutoAccept from '@/pages/chat/hooks/useAutoAccept';
import { PageContainer } from '@ant-design/pro-components';
import CurrentUser from './components/CurrentUser';
import CusDiv from '@/components/CusDiv';
import users from './store/users';
import websocket from '@/pages/chat/store/websocket';
import adminSetting from '@/pages/chat/store/adminSetting';
import { requestPermission } from '@/pages/chat/notification';

const chatWidth = 1080;
const chatHeight = 700;

const Index: React.FC = () => {
  const { connect, close } = useSnapshot(websocket);

  const { setting } = useSnapshot(adminSetting);

  React.useEffect(() => {
    adminSetting.fetchSetting();
  }, []);

  useAutoAccept();

  React.useEffect(() => {
    requestPermission();
  }, []);

  React.useEffect(() => {
    users.fetchUsers().then(() => {
      connect();
    });
    return () => {
      close();
    };
  }, [close, connect]);

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
            <CusDiv className={'w-[280px] h-full flex-shrink-0 border-r bg-[#f7f7f7]'}>
              <Users />
            </CusDiv>
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
