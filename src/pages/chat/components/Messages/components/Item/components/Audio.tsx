import React from 'react';
import Wrapper from './Wrapper';
import { MessageDirection } from '../index';
import { Icon } from '@iconify/react';

const Audio: React.FC<{
  content: string;
  direction: MessageDirection;
}> = ({ content, direction }) => {
  const [duration, setDuration] = React.useState(0);

  return (
    <Wrapper bgColor={true} direction={direction}>
      <audio
        src={content}
        onLoadedData={(e) => {
          setDuration((e.target as HTMLAudioElement).duration);
        }}
      ></audio>
      <a href={content} target={'_blank'} rel="noreferrer" className={'flex items-center'}>
        &nbsp;&nbsp;&nbsp;
        {duration > 0 && <span className={'text-xs'}>{duration.toFixed(0)}&apos;</span>}
        <Icon icon={'weui:voice-outlined'} className={'text-lg rotate-180'} />
      </a>
    </Wrapper>
  );
};

export default Audio;
