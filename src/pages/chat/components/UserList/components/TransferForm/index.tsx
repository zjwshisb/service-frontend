import React from 'react';
import { ModalForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { useModel } from '@@/plugin-model/useModel';
import { handleTransfer } from '@/services';
import useRemoveUser from '@/hooks/useRemoveUser';
import { message } from 'antd';

const Index: React.FC = () => {
  const { visible, setVisible, user, setUser } = useModel('useTransferModel');
  const initialState = useModel('@@initialState');
  const { admins } = useModel('useAdminModel');
  const handleRemoveUser = useRemoveUser();

  const handleSubmit = React.useCallback(
    (toId: number, remark = '') => {
      if (user?.id) {
        handleTransfer(user.id, toId, remark).then(() => {
          handleRemoveUser(user);
          setVisible(false);
          setUser(undefined);
          message.success('转接成功');
        });
      }
    },
    [handleRemoveUser, setUser, setVisible, user],
  );

  return (
    <ModalForm
      title={`转接用户-${user?.username}`}
      visible={visible}
      onFinish={async (data) => {
        await handleSubmit(data.to_id, data.remark);
      }}
      modalProps={{
        destroyOnClose: true,
      }}
      onVisibleChange={setVisible}
      width={'400px'}
      labelCol={{ span: 5 }}
      layout={'horizontal'}
    >
      <ProFormSelect
        name={'to_id'}
        label={'转接给'}
        rules={[{ required: true, message: '请选择' }]}
        options={admins
          .filter((v) => {
            return v.id !== initialState.initialState?.currentUser?.id;
          })
          .map((v) => {
            return {
              label: v.username,
              value: v.id,
            };
          })}
      />
      <ProFormTextArea
        rules={[{ max: 255 }]}
        name={'remark'}
        label={'备注'}
        fieldProps={{
          maxLength: 255,
        }}
      />
    </ModalForm>
  );
};
export default Index;
