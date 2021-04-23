import React from 'react';
import { Modal, Avatar } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import Upload from '@/components/Upload/index';
import type { UploadFile } from 'antd/lib/upload/interface';

const Index: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  const initialState = useModel('@@initialState');

  const onChange = React.useCallback(
    (file: UploadFile) => {
      if (file.status === 'done') {
        initialState.refresh();
      }
    },
    [initialState],
  );

  return (
    <>
      <a onClick={() => setVisible(true)}>更换头像</a>
      <Modal footer={<></>} visible={visible} onCancel={() => setVisible(false)} width={400}>
        <Upload onChange={onChange} action={`${BASE_URL}/me/avatar`}>
          <Avatar
            className={'pointer'}
            shape="square"
            src={initialState.initialState?.currentUser?.avatar}
            size={352}
          >
            {initialState.initialState?.currentUser?.username}
          </Avatar>
        </Upload>
      </Modal>
    </>
  );
};
export default Index;
