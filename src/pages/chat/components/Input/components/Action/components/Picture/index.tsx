import React from 'react';
import { PictureOutlined } from '@ant-design/icons/lib';
import Upload from '@/components/Upload/index';
import { createMsg } from '@/utils';
import { useModel } from '@umijs/max';

const Index = () => {
  const { current } = useModel('useCurrentModel');
  const { send } = useModel('useWebsocketModel');

  const onChange = React.useCallback(
    (url: string) => {
      if (current) {
        if (url !== '') {
          createMsg(url, current.id, 'image').then((msg) => {
            send(msg);
          });
        }
      }
    },
    [current, send],
  );

  return (
    <Upload path={'chat'} onChange={onChange}>
      <PictureOutlined className={'action-icon'} />
    </Upload>
  );
};
export default Index;
