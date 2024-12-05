import React from 'react';
import Avatar from '../components/Avatar';
import Spin from '../components/Spin';
import Text from '../components/Text';
import Image from '../components/Image';
import Navigator from '../components/Navigator';
import Notice from '../Notice';
import dayjs from 'dayjs';
import classNames from 'classnames';

const Index: React.FC<{
  message: API.Message;
  prev?: API.Message;
}> = (props) => {
  return React.useMemo(() => {
    const currMoment = dayjs(props.message.received_at);
    let time = <></>;
    if (props.prev) {
      const duration = currMoment.diff(props.prev.received_at);
      if (duration > 30 * 60) {
        time = <Notice>{currMoment.format('YYYY-MM-DD HH:mm:ss')}</Notice>;
      }
    } else {
      time = <Notice>{currMoment.format('YYYY-MM-DD HH:mm:ss')}</Notice>;
    }
    return (
      <>
        <div
          className={classNames('flex items-center w-full mt-3.5', {
            'flex-row-reverse': props.message.source === 1,
          })}
        >
          <div className={'self-start w-[30px] h-[30px]'}>
            <Avatar src={props.message.avatar} />
          </div>
          <div
            className={classNames(
              'max-w-[400px] mx-1 p-1 text-base whitespace-pre-wrap break-all rounded',
              {
                'bg-white': props.message.type === 'text' && props.message.source !== 1,
                'bg-[#95ec69]': props.message.source === 1 && props.message.type === 'text',
                'text-[#0f170a]': props.message.source === 1,
              },
            )}
          >
            {props.message.type === 'text' && <Text content={props.message.content} />}
            {props.message.type === 'file' && <Image content={props.message.content} />}
            {props.message.type === 'navigator' && <Navigator content={props.message.content} />}
          </div>
          {props.message.source === 1 && <Spin isSuccess={props.message.is_success} />}
        </div>
        {time}
      </>
    );
  }, [
    props.message.avatar,
    props.message.content,
    props.message.source,
    props.message.is_success,
    props.message.received_at,
    props.message.type,
    props.prev,
  ]);
};
export default Index;
