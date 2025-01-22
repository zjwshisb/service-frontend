import React from 'react';
import { PictureOutlined } from '@ant-design/icons/lib';
import { useModel } from '@umijs/max';
import { Dropdown } from 'antd';
import Upload from '@/components/Upload';
import { useSnapshot } from '@@/exports';
import websocket from '@/pages/chat/store/websocket';
const type = 'image';

const Image = () => {
  const { selectFile } = useModel('fileModel');

  const { send } = useSnapshot(websocket);

  return (
    <Dropdown
      trigger={['hover']}
      menu={{
        items: [
          {
            label: '图库选择',
            key: 'select',
            onClick() {
              selectFile({
                type,
                count: 1,
              }).then((res) => {
                if (res[0]) {
                  send(res[0].url, type);
                }
              });
            },
          },
          {
            label: (
              <Upload
                isResource={false}
                fileType={type}
                onSuccess={(e) => {
                  send(e.url, type);
                }}
                multiple={true}
              >
                本地上传
              </Upload>
            ),
            key: 'upload',
          },
        ],
      }}
    >
      <PictureOutlined className={'cursor-pointer'} />
    </Dropdown>
  );
};
export default Image;
