import React, { useRef } from 'react';
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
import { getAutoMessageForm, storeAutoMessage, updateAutoMessage } from '@/services/auto';
import { App } from 'antd';
import { history } from '@umijs/max';
import { FormInstance } from 'antd/es';
import { extraData } from '@/utils';

const Form: React.FC<{
  id?: React.Key;
}> = (props) => {
  const { id } = props;

  const { message } = App.useApp();

  const form = useRef<FormInstance<FORM.AutoMessageForm>>(null);

  return (
    <ProForm<FORM.AutoMessageForm>
      formRef={form}
      request={
        id
          ? async () => {
              return await extraData(getAutoMessageForm(id));
            }
          : undefined
      }
      className={'w-full'}
      onFinish={async (data) => {
        if (id) {
          await updateAutoMessage(data, id);
        } else {
          await storeAutoMessage(data);
        }
        message.success('操作成功');
        history.back();
      }}
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
        fieldProps={{
          maxLength: 32,
        }}
      />
      <ProFormSelect
        rules={[{ required: true, message: '请选择消息类型' }]}
        valueEnum={MessageType}
        label={'消息类型'}
        name={'type'}
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
            case 'file': {
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
export default Form;
