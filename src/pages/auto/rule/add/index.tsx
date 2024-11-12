import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import AutoRuleForm from '../components/Form';
import { message } from 'antd';
import { history } from '@umijs/max';
import { storeAutoRule } from '@/services/auto';

const Index = () => {
  const submit = React.useCallback(async (data: FORM.AutoRuleForm) => {
    await storeAutoRule(data);
    message.success('操作成功');
    history.back();
  }, []);

  return (
    <PageContainer>
      <ProCard layout={'center'}>
        <AutoRuleForm submit={submit} />
      </ProCard>
    </PageContainer>
  );
};

export default Index;
