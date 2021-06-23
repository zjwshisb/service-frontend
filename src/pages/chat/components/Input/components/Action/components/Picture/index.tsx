import React from 'react';
import { PictureOutlined } from '@ant-design/icons/lib';
import Upload from '@/components/Upload/index';
import { createMsg } from '@/utils';
import { useModel } from '@@/plugin-model/useModel';

const Index = () => {
  const { current } = useModel('useCurrentModel');
  const { send } = useModel('useWebsocketModel');

  const onChange = React.useCallback(
    (url: string) => {
      console.log(url);
      if (current) {
        if (url !== '') {
          const action = createMsg(url, current.id, 'image');
          send(action);
        }
      }
    },
    [current, send],
  );

  return (
    <Upload action={`${BASE_URL}/ws/image`} onChange={onChange}>
      <PictureOutlined className={'action-icon'} />
    </Upload>
  );
};
export default Index;
