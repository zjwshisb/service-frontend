import React from 'react';
import { If, Then, Else } from 'react-if';

const IsRead: React.FC<{
  isRead?: boolean;
}> = ({ isRead }) => {
  return (
    <div className={'text-xs text-right'}>
      <If condition={isRead}>
        <Then>
          <span className={'text-gray-600'}>已读</span>
        </Then>
        <Else>
          <span className={'text-red-400'}>未读</span>
        </Else>
      </If>
    </div>
  );
};

export default IsRead;
