import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import AutoRuleForm from '../components/Form';
import { message } from 'antd';
import { history } from '@@/core/history';
import { storeAutoRule } from '@/services/auto';

const Index = () => {
  const submit = React.useCallback(async (data: FORM.AutoRuleForm) => {
    await storeAutoRule(data);
    message.success('操作成功');
    history.goBack();
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
