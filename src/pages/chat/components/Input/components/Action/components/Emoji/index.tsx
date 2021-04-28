import React from 'react';
import { NimblePicker } from 'emoji-mart';
import { Popover } from 'antd';
import { SmileOutlined } from '@ant-design/icons/lib';
import { useModel } from '@@/plugin-model/useModel';
import data from 'emoji-mart/data/apple.json';

const Index = () => {
  const { append } = useModel('useInputModel');

  return (
    <div>
      <Popover
        content={
          <NimblePicker
            set={'apple'}
            data={data}
            onSelect={(e) => {
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
