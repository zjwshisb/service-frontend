import React from 'react';
import Action from './components/Action/index';
import Input from './components/Text/index';
import { useModel } from '@umijs/max';

const Index: React.FC = () => {
  const { current } = useModel('chat.currentUser');

  if (!current) {
    return <></>;
  }
  return (
    <div className={'relative flex-shrink-0 h-[220px]'}>
      <Action />
      <Input />
      {current.disabled && (
        <div className={'absolute top-0 w-full h-full cursor-not-allowed z-30'} />
      )}
    </div>
  );
};
export default Index;
