import React from 'react';
import Wrapper from './Wrapper';
import { MessageDirection } from '../index';
import FileImg from '@/components/FileItem/FileImg';

const Pdf: React.FC<{
  content: string;
  direction: MessageDirection;
}> = ({ content, direction }) => {
  return (
    <Wrapper direction={direction}>
      <a href={content} target={'_blank'} rel="noreferrer" className={'flex items-center'}>
        <FileImg type={'pdf'} preview={false} width={100} height={100} />
      </a>
    </Wrapper>
  );
};

export default Pdf;
