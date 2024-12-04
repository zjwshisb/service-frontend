import React from 'react';
import Picture from './components/Picture';
import Emoji from './components/Emoji';
import ShortcutReply from './components/ShortcutReply';
import { Space } from 'antd';

const Action: React.FC = () => {
  return (
    <div className={'flex items-center w-full h-[40px] px-2.5 text-lg'}>
      <Space>
        <Emoji />
        <Picture />
        <ShortcutReply />
      </Space>
    </div>
  );
};
export default Action;
