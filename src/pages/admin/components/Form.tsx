import React, { useRef } from 'react';
import { ProCard, ProForm, ProFormDependency, ProFormText } from '@ant-design/pro-components';
import { App } from 'antd';
import { history } from '@umijs/max';
import { FormInstance } from 'antd/es';
import { storeAdmin } from '@/services';

const Form: React.FC = () => {
  const { message } = App.useApp();

  const form = useRef<FormInstance<FORM.AdminForm>>(null);

  return (
    <ProCard>
      <ProForm<FORM.AdminForm>
        formRef={form}
        className={'w-full'}
        onFinish={async (data) => {
          await storeAdmin(data);
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
          label={'登录账号'}
          placeholder={'登录账号'}
          name={'username'}
          required={true}
          fieldProps={{
            maxLength: 32,
          }}
        />
        <ProFormText.Password
          label={'登录密码'}
          placeholder={'登录密码'}
          name={'password'}
          rules={[
            {
              required: true,
              max: 32,
            },
          ]}
        ></ProFormText.Password>
        <ProFormDependency name={['password']}>
          {({ password }) => {
            return (
              <ProFormText.Password
                label={'重复密码'}
                placeholder={'再次输入密码'}
                name={'verify_password'}
                rules={[
                  {
                    required: true,
                    validator(_, v) {
                      if (v !== password) {
                        return Promise.reject('两次密码不一致');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              ></ProFormText.Password>
            );
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  );
};
export default Form;
