import React from 'react';
import Picture from './components/Picture';
import Emoji from './components/Emoji';
import ShortcutReply from './components/ShortcutReply';

const Action: React.FC = () => {
  return (
    <div className={'flex items-center w-full h-[50px] px-2.5 '}>
      <Emoji />
      <Picture />
      <ShortcutReply />
    </div>
  );
};
export default Action;
