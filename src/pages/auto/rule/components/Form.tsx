import React from 'react';
import ProForm, {
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormDigit,
  ProFormSwitch,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import type { FormInstance } from 'antd/es';

import { replyTypeLabel, matchTypeLabel } from '@/pages/auto/rule';
import { getAutoRuleMessages, getAutoRuleScenes, getAutoRuleEvents } from '@/services/auto';

const Index: React.FC<{
  submit: (data: FORM.AutoRuleForm) => Promise<void>;
  initialValues?: Partial<FORM.AutoRuleForm>;
  readonlyValues?: string[];
}> = (props) => {
  const form = React.useRef<FormInstance<FORM.AutoRuleForm>>();

  React.useEffect(() => {
    if (props.initialValues && form.current) {
      form.current.resetFields();
    }
  }, [props.initialValues]);

  return (
    <ProForm<FORM.AutoRuleForm>
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
        label={'规则名称'}
        placeholder={'随便起个名字'}
        name={'name'}
        fieldProps={{
          maxLength: 32,
        }}
      />
      <ProFormSelect
        rules={[{ required: true, message: '请选择' }]}
        label={'匹配规则'}
        name={'match_type'}
        valueEnum={matchTypeLabel}
      />
      <ProFormText
        rules={[
          {
            required: true,
            max: 32,
          },
        ]}
        label={'匹配文字'}
        placeholder={'所需要匹配的文字'}
        name={'match'}
      />
      <ProFormSelect
        rules={[{ required: true, message: '请选择' }]}
        valueEnum={replyTypeLabel}
        label={'回复类型'}
        name={'reply_type'}
        readonly={props.readonlyValues?.includes('reply_type')}
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
                  request={() => {
                    return getAutoRuleMessages().then((res) => res.data);
                  }}
                />
              );
            case 'event':
              return (
                <>
                  <ProFormSelect
                    rules={[{ required: true, message: '请选择' }]}
                    name={'key'}
                    label={'触发的事件'}
                    fieldProps={{}}
                    request={() => {
                      return getAutoRuleEvents().then((res) => res.data);
                    }}
                  />
                  <ProFormSelect
                    rules={[{ required: true, message: '请选择' }]}
                    name={'message_id'}
                    label={'回复的消息'}
                    tooltip={'事件触发后并且回复的消息'}
                    fieldProps={{}}
                    request={() => {
                      return getAutoRuleMessages().then((res) => res.data);
                    }}
                  />
                </>
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
            case 'event':
              return (
                <>
                  <ProFormCheckbox.Group
                    rules={[{ required: true, message: '请选择' }]}
                    name={'scenes'}
                    label={'触发场景'}
                    tooltip={'指在什么场景下触发'}
                    request={() => {
                      return getAutoRuleScenes().then((res) => res.data);
                    }}
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
        required={true}
        name={'sort'}
        min={0}
        max={128}
        rules={[{ required: true }]}
        tooltip={'从小到大，当多个符合条件的规则时取最小的'}
      />
      <ProFormSwitch label={'启用'} name={'is_open'} />
    </ProForm>
  );
};
Index.defaultProps = {
  readonlyValues: [],
};
export default Index;
