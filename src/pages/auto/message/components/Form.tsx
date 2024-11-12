import React from 'react';
import {
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProForm,
} from '@ant-design/pro-components';
import { MessageType } from '@/pages/auto/message/index';
import ImageField from './Image';
import NavigatorCardField from './NavigatorCard';
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
        rules={[{ required: true, message: '请选择消息类型' }]}
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
      <ProFormDependency name={['type']}>
        {({ type }) => {
          switch (type as API.MessageType) {
            case 'text': {
              return (
                <ProFormTextArea
                  fieldProps={{
                    autoSize: true,
                  }}
                  rules={[{ required: true, max: 512 }]}
                  required={true}
                  name={'content'}
                  label={'消息内容'}
                />
              );
            }
            case 'image': {
              return <ImageField />;
            }
            case 'navigator': {
              return <NavigatorCardField />;
            }
            default:
              return <></>;
          }
        }}
      </ProFormDependency>
    </ProForm>
  );
};
export default Index;
