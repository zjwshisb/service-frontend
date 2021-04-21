import React from 'react';
import { Modal, Avatar, Upload } from 'antd';
import { useModel } from '@@/plugin-model/useModel';

const Index: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const initialState = useModel('@@initialState');

  return (
    <>
      <a onClick={() => setVisible(true)}>更换头像</a>
      <Modal visible={visible} onCancel={() => setVisible(false)} width={400}>
        <Upload>
          <Avatar shape="square" size={352}>
            {initialState.initialState?.currentUser?.username}
          </Avatar>
        </Upload>
      </Modal>
    </>
  );
};
export default Index;
