import React from 'react';
import { ModalForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { handleTransfer } from '@/services';
import useRemoveUser from '@/pages/chat/hooks/useRemoveUser';
import { App } from 'antd';

const TransferForm: React.FC = () => {
  const { visible, setVisible, user, setUser } = useModel('chat.transfer');
  const initialState = useModel('@@initialState');
  const { admins } = useModel('chat.admins');
  const handleRemoveUser = useRemoveUser();

  const { message } = App.useApp();

  const handleSubmit = React.useCallback(
    (toId: number, remark = '') => {
      if (user?.id) {
        handleTransfer(user.id, toId, remark).then(() => {
          handleRemoveUser(user);
          setVisible(false);
          setUser(undefined);
          message.success('转接成功').then();
        });
      }
    },
    [handleRemoveUser, message, setUser, setVisible, user],
  );

  return (
    <ModalForm
      title={`转接用户-${user?.username}`}
      open={visible}
      onFinish={async (data) => {
        handleSubmit(data.to_id, data.remark);
      }}
      modalProps={{
        destroyOnClose: true,
      }}
      onOpenChange={setVisible}
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
export default TransferForm;
