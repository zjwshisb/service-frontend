import React from 'react';
import Picture from './components/Picture';
import Emoji from './components/Emoji';
import ShortcutReply from './components/ShortcutReply';

const Index: React.FC = () => {
  return React.useMemo(() => {
    return (
      <div className={'flex items-center w-full h-[50px] px-2.5 '}>
        <Emoji />
        <Picture />
        <ShortcutReply />
      </div>
    );
  }, []);
};
export default Index;
