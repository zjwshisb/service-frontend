import React from 'react';
import Avatar from './components/Avatar';
import Spin from './components/Spin';
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

const Index: React.FC<{
  message: API.Message;
  prev?: API.Message;
}> = (props) => {
  const { message } = props;

  let time = React.useMemo(() => {
    const currentTime = dayjs(message.received_at);
    if (props.prev) {
      const duration = currentTime.diff(props.prev.received_at, 's');
      if (duration < 30 * 60) {
        return;
      }
    }
    return <Notice>{currentTime.format('YYYY-MM-DD HH:mm:ss')}</Notice>;
  }, [message.received_at, props.prev]);

  return (
    <>
      <div
        className={classNames('flex items-center w-full mt-3.5', {
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
                <Text
                  className={classNames({
                    'bg-white': message.source !== 1,
                    'bg-[#95ec69]': message.source === 1,
                    'text-[#0f170a]': message.source === 1,
                  })}
                  content={message.content}
                />
              </Case>
              <Case condition={message.type === 'image'}>
                <Image content={message.content} />
              </Case>
              <Case condition={message.type === 'navigator'}>
                <Navigator content={message.content} />
              </Case>
              <Case condition={message.type === 'audio'}>
                <Audio content={message.content} />
              </Case>
              <Case condition={message.type === 'video'}>
                <Video content={message.content} />
              </Case>
            </Switch>
          </div>
          <When condition={message.source === 1 && message.is_success !== undefined}>
            <IsRead isRead={message.is_read} />
          </When>
        </div>
        <When condition={message.source === 1}>
          <Spin isSuccess={message.is_success} />
        </When>
      </div>
      {time}
    </>
  );
};
export default Index;
