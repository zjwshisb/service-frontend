import React from 'react';
import Avatar from './components/Avatar';
import Status from './components/Status';
import Text from './components/Text';
import Image from './components/Image';
import Navigator from './components/Navigator';
import Audio from './components/Audio';
import Video from './components/Video';
import IsRead from './components/IsRead';
import Notice from '../Notice';
import Pdf from './components/Pdf';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Case, Switch, When } from 'react-if';
import { formatTime } from '@/utils/utils';
import { useSnapshot } from '@umijs/max';
import currentUser from '@/pages/chat/store/currentUser';
import websocket from '@/pages/chat/store/websocket';

export type MessageDirection = 'left' | 'right';

const Index: React.FC<{
  message: API.Message;
  prev?: API.Message;
}> = (props) => {
  const { message } = props;

  const { removeMessage } = useSnapshot(currentUser);

  const { send } = useSnapshot(websocket);

  let time = React.useMemo(() => {
    const currentTime = dayjs(message.received_at);
    if (props.prev) {
      const duration = currentTime.diff(props.prev.received_at, 's');
      if (duration < 30 * 60) {
        return;
      }
    }
    return <Notice>{formatTime(currentTime.toString())}</Notice>;
  }, [message.received_at, props.prev]);

  const resendMsg = React.useCallback(() => {
    const msg = removeMessage(props.message.req_id);
    if (msg) {
      send(msg.content, msg.type);
    }
  }, [props.message.req_id, removeMessage, send]);

  const direction: MessageDirection = React.useMemo(() => {
    return message.source === 1 ? 'right' : 'left';
  }, [message.source]);

  return (
    <>
      <div
        className={classNames('flex items-start w-full mt-3.5', {
          'flex-row-reverse': direction === 'right',
        })}
      >
        <div className={'self-start w-[30px] h-[30px]'}>
          <Avatar src={message.avatar} />
        </div>
        <div className={'max-w-[400px] mx-1'}>
          <div>
            <Switch>
              <Case condition={message.type === 'text'}>
                <Text direction={direction} content={message.content} />
              </Case>
              <Case condition={message.type === 'image'}>
                <Image content={message.content} />
              </Case>
              <Case condition={message.type === 'navigator'}>
                <Navigator content={message.content} />
              </Case>
              <Case condition={message.type === 'audio'}>
                <Audio content={message.content} direction={direction} />
              </Case>
              <Case condition={message.type === 'video'}>
                <Video content={message.content} />
              </Case>
              <Case condition={message.type === 'pdf'}>
                <Pdf content={message.content} direction={direction} />
              </Case>
            </Switch>
          </div>
          <When condition={direction === 'right' && message.is_success !== undefined}>
            <IsRead isRead={message.is_read} />
          </When>
        </div>
        <When condition={direction === 'right'}>
          <Status isSuccess={message.is_success} onResend={resendMsg} />
        </When>
      </div>
      {time}
    </>
  );
};
export default Index;
