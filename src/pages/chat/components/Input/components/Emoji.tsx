import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Popover } from 'antd';
import { Icon } from '@iconify/react';

const Emoji: React.FC<{
  onSelect: (v: string) => void;
}> = (props) => {
  return (
    <div>
      <Popover
        content={
          <Picker
            locale={'zh'}
            data={data}
            onEmojiSelect={(e: { native: string }) => {
              if ('native' in e && e.native) {
                props.onSelect(e.native);
              }
            }}
            title={'emoji表情'}
            showPreview={false}
          />
        }
        trigger={['click']}
      >
        <Icon icon={'mdi:emoji-outline'} className={'cursor-pointer'}></Icon>
      </Popover>
    </div>
  );
};
export default Emoji;
