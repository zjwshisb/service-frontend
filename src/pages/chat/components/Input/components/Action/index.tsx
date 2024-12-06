import React from 'react';
import Image from './components/Image';
import Emoji from './components/Emoji';
import ShortcutReply from './components/ShortcutReply';
import { Space } from 'antd';
import Audio from './components/Audio';
import Video from './components/Video';

const Action: React.FC = () => {
  return (
    <div className={'w-full h-[40px] px-2.5 text-lg'}>
      <Space size={'middle'} className={'flex items-center h-full'}>
        <Emoji />
        <Image />
        <Audio />
        <Video />
        <ShortcutReply />
      </Space>
    </div>
  );
};
export default Action;
