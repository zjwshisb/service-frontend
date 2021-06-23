import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { FormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormSelect, ProFormDependency } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { MessageType } from '@/pages/auto/message';
import ImageField from './components/Image';
import NavigatorCardField from './components/NavigatorCard';

const Index = () => {
  const form = React.useRef<FormInstance<FORM.AutoMessageForm>>();

  const submit = React.useCallback(async () => {
    form.current?.validateFields().then(() => {});
  }, []);

  return (
    <PageContainer>
      <ProCard layout={'center'}>
        <ProForm onFinish={submit} labelCol={{ span: 5 }} style={{ width: '600px' }} formRef={form}>
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
            rules={[{ required: true }]}
            valueEnum={MessageType}
            label={'回复消息类型'}
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
                    <ProFormText
                      rules={[{ required: true }]}
                      required={true}
                      name={'content'}
                      label={'回复内容'}
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
      </ProCard>
    </PageContainer>
  );
};

export default Index;
