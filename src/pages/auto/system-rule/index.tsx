import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormSelect } from '@ant-design/pro-form';
import { getSystemAutoRule, getAutoRuleMessages, updateSystemAutoRule } from '@/services/auto';
import ProCard from '@ant-design/pro-card';
import { message } from 'antd';

const Index = () => {
  const [rules, setRules] = React.useState<API.AutoRule[]>([]);

  const [messages, setMessage] = React.useState<API.Option[]>([]);

  React.useEffect(() => {
    getAutoRuleMessages().then((res) => {
      setMessage(res.data);
    });
  }, []);

  React.useEffect(() => {
    getSystemAutoRule().then((res) => {
      setRules(res.data);
    });
  }, []);

  return (
    <PageContainer>
      <ProCard layout={'center'}>
        <ProForm
          style={{ width: '600px' }}
          onFinish={(data) => {
            return updateSystemAutoRule(data).then(() => {
              message.success('修改成功');
            });
          }}
        >
          {rules.map((v) => {
            return (
              <ProFormSelect
                initialValue={v.message_id > 0 ? v.message_id : undefined}
                key={v.id}
                label={v.name}
                name={v.id}
                options={messages}
              />
            );
          })}
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};
export default Index;
