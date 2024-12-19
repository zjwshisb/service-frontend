import React from 'react';
import { ProFormInstance, ProForm, ModalForm, ProFormText } from '@ant-design/pro-components';
import { updateSetting } from '@/services';
import { Form, Input, Select } from 'antd';
import ProFormFileSelect from '@/components/ProFormFileSelect';

const SettingForm: React.FC<{
  row?: API.Setting;
  onSuccess: () => void;
  onCancel: () => void;
}> = ({ row, onSuccess, onCancel }) => {
  const formRef = React.useRef<ProFormInstance>();

  return (
    <ModalForm
      width={500}
      modalProps={{
        zIndex: 9,
      }}
      onFinish={async (form) => {
        if (row) {
          await updateSetting(row.id, form.value);
          onSuccess();
        }
      }}
      formRef={formRef}
      onOpenChange={(v) => {
        if (v) {
          formRef.current?.setFieldsValue({
            title: row?.title,
            value: row?.value,
            type: row?.type,
          });
        } else {
          onCancel();
        }
      }}
      open={!!row}
      title={'配置修改'}
    >
      <ProForm.Group>
        <ProFormText width="xl" name="title" readonly={true} label={'配置名称'} />
      </ProForm.Group>
      <Form.Item
        shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
      >
        {({ getFieldValue }) => {
          const type = getFieldValue('type');
          switch (type) {
            case 'select': {
              return (
                <Form.Item label={'值'} name={'value'}>
                  <Select options={row?.options} />
                </Form.Item>
              );
            }
            case 'text': {
              return (
                <Form.Item
                  label={'值'}
                  name="value"
                  rules={[
                    {
                      max: 10,
                    },
                  ]}
                >
                  <Input placeholder="请输入名称" />
                </Form.Item>
              );
            }
            case 'image': {
              return (
                <ProFormFileSelect
                  fieldProps={{
                    type: 'image',
                  }}
                  name={'value'}
                  label={'值'}
                />
              );
            }
          }
          return <></>;
        }}
      </Form.Item>
    </ModalForm>
  );
};
export default SettingForm;
