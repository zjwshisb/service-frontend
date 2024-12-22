import React from 'react';
import Wrapper from './Wrapper';
import { Icon } from '@iconify/react';

const Video: React.FC<{
  content: string;
}> = (props) => {
  return (
    <Wrapper>
      <div className={'relative'}>
        <video src={props.content} controls={false} autoPlay={false}></video>
        <a
          href={props.content}
          target="_blank"
          rel="noreferrer"
          className={
            'absolute w-full h-full top-0 left-0 flex items-center justify-center text-white'
          }
        >
          <Icon icon={'icon-park-solid:play'} className={'text-6xl'}></Icon>
        </a>
      </div>
    </Wrapper>
  );
};

export default Video;
