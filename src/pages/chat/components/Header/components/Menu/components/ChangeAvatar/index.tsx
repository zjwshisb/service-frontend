import React from 'react';
import { Modal, Avatar } from 'antd';
import { useModel } from '@umijs/max';
import Upload from '@/components/Upload/index';
import { updateAvatar } from '@/services';
import 'antd/es/slider/style';
import { useBoolean } from 'ahooks';

const Index: React.FC = () => {
  const [open, action] = useBoolean(false);

  const { setting, refresh } = useModel('useSettingModel');

  const onUpload = React.useCallback(
    async (url: string) => {
      await updateAvatar(url);
      refresh();
    },
    [refresh],
  );

  return (
    <>
      <a onClick={action.toggle}>更换头像</a>
      <Modal footer={<></>} open={open} onCancel={action.setFalse} width={400}>
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
