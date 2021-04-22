import React from 'react';
import { Modal, Avatar, Upload } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { getToken } from '@/utils/auth';

const Index: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  const initialState = useModel('@@initialState');

  const headers = {
    Authorization: `bearer ${getToken()}`,
  };

  const onChange = React.useCallback(
    (e) => {
      if (e.event && e.event.percent === 100) {
        initialState.refresh();
      }
    },
    [initialState],
  );

  return (
    <>
      <a onClick={() => setVisible(true)}>更换头像</a>
      <Modal footer={<></>} visible={visible} onCancel={() => setVisible(false)} width={400}>
        <Upload
          onChange={onChange}
          showUploadList={false}
          accept="image/*"
          headers={headers}
          action={`${BASE_URL}/me/avatar`}
        >
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
