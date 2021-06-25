import React from 'react';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { MessageType } from '@/pages/auto/message';
import type { FormInstance } from 'antd/es';

const Index: React.FC<{
  submit: (data: FORM.AutoMessageForm) => Promise<void>;
  initialValues?: Partial<FORM.AutoMessageForm>;
  readonlyValues?: string[];
}> = (props) => {
  const form = React.useRef<FormInstance<FORM.AutoMessageForm>>();

  React.useEffect(() => {
    if (props.initialValues && form.current) {
      form.current.resetFields();
    }
  }, [props.initialValues]);

  return (
    <ProForm<FORM.AutoMessageForm>
      initialValues={props.initialValues}
      onFinish={(data) => {
        return props.submit(data);
      }}
      labelCol={{ span: 5 }}
      style={{ width: '600px' }}
      formRef={form}
    >
      <ProFormText
        rules={[
          {
            required: true,
            max: 32,
          },
        ]}
        label={'消息名称'}
        placeholder={'随便起个名字'}
        name={'name'}
        required={true}
        readonly={props.readonlyValues?.includes('name')}
        fieldProps={{
          maxLength: 32,
        }}
      />
      <ProFormSelect
        rules={[{ required: true }]}
        valueEnum={MessageType}
        label={'消息类型'}
        name={'type'}
        readonly={props.readonlyValues?.includes('type')}
        required={true}
        fieldProps={{
          onChange: () => {
            form.current?.setFieldsValue({
              content: '',
            });
          },
        }}
      />
    </ProForm>
  );
};
Index.defaultProps = {
  readonlyValues: [],
};
export default Index;
