import React from 'react';
import Input from './components/Text';
import { useModel } from '@umijs/max';
import { When } from 'react-if';
import { Space } from 'antd';
import Emoji from './components/Emoji';
import Image from './components/Image';
import Audio from './components/Audio';
import Video from './components/Video';
import ShortcutReply from './components/ShortcutReply';

const Index: React.FC = () => {
  const { current } = useModel('chat.currentUser');

  const [input, setInput] = React.useState('');

  if (!current) {
    return <></>;
  }
  return (
    <div className={'relative flex-shrink-0 h-[220px]'}>
      <div className={'w-full h-[40px] px-2.5 text-lg'}>
        <Space size={'middle'} className={'flex items-center h-full'}>
          <Emoji
            onSelect={(e) => {
              setInput((prevState) => prevState + e);
            }}
          />
          <Image />
          <Audio />
          <Video />
          <ShortcutReply />
        </Space>
      </div>
      <Input value={input} onChange={setInput} />
      <When condition={current.disabled}>
        <div className={'absolute top-0 w-full h-full cursor-not-allowed z-30'} />
      </When>
    </div>
  );
};
export default Index;
