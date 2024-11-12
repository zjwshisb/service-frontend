import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Popover } from 'antd';
import { SmileOutlined } from '@ant-design/icons/lib';
import { useModel } from '@umijs/max';

const Index = () => {
  const { append } = useModel('useInputModel');

  return (
    <div>
      <Popover
        content={
          <Picker
            set={'apple'}
            data={data}
            onEmojiSelect={(e: { native: string }) => {
              if ('native' in e && e.native) {
                append(e.native);
              }
            }}
            title={'emoji表情'}
            showPreview={false}
          />
        }
        trigger={['click']}
      >
        <SmileOutlined className={'action-icon'} />
      </Popover>
    </div>
  );
};
export default Index;
