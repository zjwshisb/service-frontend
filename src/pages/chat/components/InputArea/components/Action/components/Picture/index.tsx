import React from 'react';
import { PictureOutlined } from '@ant-design/icons/lib';
import Upload from '@/components/Upload/index';
import { createMsg } from '@/utils';
import { useModel } from '@@/plugin-model/useModel';
import type { UploadFile } from 'antd/lib/upload/interface';

const Index = () => {
  const { current } = useModel('useCurrentModel');
  const { send } = useModel('useWebsocketModel');

  const onChange = React.useCallback(
    (file: UploadFile) => {
      if (file.status === 'done') {
        const resp = file.response;
        const action = createMsg(resp.data.url, current, 'image');
        send(action);
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
