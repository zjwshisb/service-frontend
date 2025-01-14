import React from 'react';
import { isUrl } from '@/utils/utils';
import Wrapper from './Wrapper';
import { MessageDirection } from '../index';

const Text: React.FC<{
  content: string;
  direction: MessageDirection;
}> = (props) => {
  return (
    <Wrapper showAnchor={true} className="relative" direction={props.direction} bgColor={true}>
      {isUrl(props.content) ? (
        <a target="_blank" href={props.content} rel="noreferrer">
          {props.content}
        </a>
      ) : (
        props.content
      )}
    </Wrapper>
  );
};

export default Text;
