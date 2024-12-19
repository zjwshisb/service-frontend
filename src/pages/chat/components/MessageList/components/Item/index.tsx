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
import dayjs from 'dayjs';
import classNames from 'classnames';
import { When, Switch, Case } from 'react-if';
import { formatTime } from '@/utils/utils';
import { useModel } from '@umijs/max';
import lodash from 'lodash';

export type MessageSourceType = 'send' | 'receive';

const Index: React.FC<{
  message: API.Message;
  prev?: API.Message;
}> = (props) => {
  const { message } = props;

  const { setCurrent } = useModel('chat.currentUser');

  const { send } = useModel('chat.websocket');

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
    setCurrent((prev) => {
      if (prev) {
        const index = prev.messages.findIndex((item) => item.req_id === message.req_id);
        if (index > -1) {
          prev.messages.splice(index, 1);
        }
        return lodash.cloneDeep(prev);
      }
      return prev;
    });
    send(message.content, message.type);
  }, [message.content, message.req_id, message.type, send, setCurrent]);

  const sourceType: MessageSourceType = React.useMemo(() => {
    return message.source === 1 ? 'send' : 'receive';
  }, [message.source]);

  return (
    <>
      <div
        className={classNames('flex items-start w-full mt-3.5', {
          'flex-row-reverse': message.source === 1,
        })}
      >
        <div className={'self-start w-[30px] h-[30px]'}>
          <Avatar src={message.avatar} />
        </div>
        <div className={'max-w-[400px] mx-1'}>
          <div>
            <Switch>
              <Case condition={message.type === 'text'}>
                <Text sourceType={sourceType} content={message.content} />
              </Case>
              <Case condition={message.type === 'image'}>
                <Image content={message.content} />
              </Case>
              <Case condition={message.type === 'navigator'}>
                <Navigator content={message.content} />
              </Case>
              <Case condition={message.type === 'audio'}>
                <Audio content={message.content} sourceType={sourceType} />
              </Case>
              <Case condition={message.type === 'video'}>
                <Video content={message.content} />
              </Case>
            </Switch>
          </div>
          <When condition={sourceType === 'send' && message.is_success !== undefined}>
            <IsRead isRead={message.is_read} />
          </When>
        </div>
        <When condition={sourceType === 'send'}>
          <Status isSuccess={message.is_success} onResend={resendMsg} />
        </When>
      </div>
      {time}
    </>
  );
};
export default Index;
