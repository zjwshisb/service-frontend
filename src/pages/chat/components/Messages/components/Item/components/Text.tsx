import React from 'react';
import { isUrl } from '@/utils/utils';
import Wrapper from './Wrapper';

const Text: React.FC<{
  content: string;
  className?: string;
  sourceType: 'send' | 'receive';
}> = (props) => {
  return (
    <Wrapper sourceType={props.sourceType} bgColor={true}>
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
