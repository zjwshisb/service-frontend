import React from 'react';
import Wrapper from './Wrapper';
import { MessageSourceType } from '../index';
import { Icon } from '@iconify/react';
const Audio: React.FC<{
  content: string;
  sourceType: MessageSourceType;
}> = ({ content, sourceType }) => {
  return (
    <Wrapper bgColor={true} sourceType={sourceType}>
      <a href={content} target={'_blank'} rel="noreferrer" className={'flex items-center'}>
        &nbsp;&nbsp;&nbsp;
        <Icon icon={'weui:voice-outlined'} className={'text-lg rotate-180'} />
      </a>
    </Wrapper>
  );
};

export default Audio;
