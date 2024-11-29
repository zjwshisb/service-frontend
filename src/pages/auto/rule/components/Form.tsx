import React from 'react';
import {
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormDigit,
  ProFormSwitch,
  ProFormCheckbox,
  ProCard,
} from '@ant-design/pro-components';
import type { FormInstance } from 'antd/es';
import { useFormRequest } from '@/hooks/useFormRequest';
import { getAutoRuleForm, storeAutoRule, updateAutoRule } from '@/services/auto';
import { App } from 'antd';
import { history } from '@umijs/max';
import { useModel } from '@@/exports';

const Index: React.FC<{
  id?: React.Key;
}> = (props) => {
  const { id } = props;

  const form = React.useRef<FormInstance<FORM.AutoRuleForm>>();

  const request = useFormRequest(getAutoRuleForm, id);
  const { message } = App.useApp();

  const { getOptions } = useModel('options');

  return (
    <ProCard>
      <ProForm<FORM.AutoRuleForm>
        request={request}
        onFinish={async (data) => {
          if (id) {
            await updateAutoRule(data, id);
          } else {
            await storeAutoRule(data);
          }
          message.success('操作成功');
          history.back();
        }}
        className={'w-full'}
        formRef={form}
      >
        <ProFormText
          rules={[
            {
              required: true,
              max: 32,
            },
          ]}
          label={'规则名称'}
          placeholder={'随便起个名字'}
          name={'name'}
          fieldProps={{
            maxLength: 32,
            showCount: true,
          }}
        />
        <ProFormSelect
          rules={[{ required: true, message: '请选择' }]}
          label={'匹配规则'}
          name={'match_type'}
          request={() => getOptions('auto-rule-match-types')}
        />
        <ProFormText
          rules={[
            {
              required: true,
              max: 32,
            },
          ]}
          label={'匹配文字'}
          fieldProps={{
            maxLength: 32,
            showCount: true,
          }}
          placeholder={'所需要匹配的文字'}
          name={'match'}
        />
        <ProFormSelect
          rules={[{ required: true, message: '请选择' }]}
          request={() => getOptions('auto-rule-reply-types')}
          label={'回复类型'}
          readonly={!!id}
          name={'reply_type'}
          fieldProps={{
            onChange: () => {
              form.current?.setFieldsValue({
                message_id: undefined,
              });
            },
          }}
        />
        <ProFormDependency name={['reply_type']}>
          {({ reply_type }) => {
            switch (reply_type as API.ReplyType) {
              case 'message':
                return (
                  <ProFormSelect
                    rules={[{ required: true, message: '请选择' }]}
                    name={'message_id'}
                    label={'回复的消息'}
                    request={() => getOptions('auto-messages')}
                  />
                );
              case 'transfer':
              default:
                return <></>;
            }
          }}
        </ProFormDependency>
        <ProFormDependency name={['reply_type']}>
          {({ reply_type }) => {
            switch (reply_type as API.ReplyType) {
              case 'message':
                return (
                  <>
                    <ProFormCheckbox.Group
                      rules={[{ required: true, message: '请选择' }]}
                      name={'scenes'}
                      label={'触发场景'}
                      tooltip={'指在什么场景下触发'}
                      request={async () => getOptions('auto-rule-scenes')}
                    />
                  </>
                );
              case 'transfer':
              default:
                return <></>;
            }
          }}
        </ProFormDependency>
        <ProFormDigit
          label={'排序'}
          name={'sort'}
          min={0}
          max={10000}
          rules={[{ required: true }]}
          tooltip={'从小到大，当多个符合条件的规则时取最小的'}
        />
        <ProFormSwitch label={'启用'} name={'is_open'} />
      </ProForm>
    </ProCard>
  );
};
export default Index;
