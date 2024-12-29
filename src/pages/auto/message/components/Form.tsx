import React, { useRef } from 'react';
import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import NavigatorCardField from './NavigatorCard';
import { getAutoMessageForm, storeAutoMessage, updateAutoMessage } from '@/services/auto';
import { App } from 'antd';
import { history } from '@umijs/max';
import { FormInstance } from 'antd/es';
import ProFormFileSelect from '@/components/ProFormFileSelect';
import { useFormRequest } from '@/hooks/useFormRequest';
import { useModel } from '@@/exports';

const Form: React.FC<{
  id?: React.Key;
}> = (props) => {
  const { id } = props;

  const { message } = App.useApp();

  const form = useRef<FormInstance<FORM.AutoMessageForm>>(null);

  const request = useFormRequest(getAutoMessageForm, id);

  const { getOptions } = useModel('options');

  return (
    <ProCard>
      <ProForm<FORM.AutoMessageForm>
        formRef={form}
        request={request}
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
          request={() => getOptions('message-types')}
          label={'消息类型'}
          name={'type'}
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
                      rows: 4,
                      maxLength: 512,
                      showCount: true,
                    }}
                    rules={[{ required: true, max: 512 }]}
                    name={'content'}
                    label={'消息内容'}
                  />
                );
              }
              case 'navigator': {
                return <NavigatorCardField />;
              }
              case 'audio':
              case 'image':
              case 'video':
                return (
                  <ProFormFileSelect
                    rules={[
                      {
                        required: true,
                        message: '请选择文件',
                      },
                    ]}
                    fieldProps={{
                      type: type,
                    }}
                    name={'file'}
                    label={'文件'}
                  ></ProFormFileSelect>
                );
              default: {
                return <></>;
              }
            }
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  );
};
export default Form;
