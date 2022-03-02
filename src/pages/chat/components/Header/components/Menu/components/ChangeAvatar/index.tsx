import React from 'react';
import { Modal, Avatar } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import Upload from '@/components/Upload/index';
import { updateAvatar } from '@/services';
import 'antd/es/slider/style';

const Index: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  const { setting, refresh } = useModel('useSettingModel');

  const onUpload = React.useCallback(
    async (url) => {
      await updateAvatar(url);
      refresh();
    },
    [refresh],
  );

  return (
    <>
      <a onClick={() => setVisible(true)}>更换头像</a>
      <Modal footer={<></>} visible={visible} onCancel={() => setVisible(false)} width={400}>
        <Upload onChange={onUpload} path={`avatar`} corp={true}>
          <Avatar className={'pointer'} shape="square" src={setting?.avatar} size={352}>
            {setting?.name}
          </Avatar>
        </Upload>
      </Modal>
    </>
  );
};
export default Index;
