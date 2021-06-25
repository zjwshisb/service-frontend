import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { storeAutoMessage } from '@/services/auto';
import RuleForm from '../components/Form';
import { message } from 'antd';
import { history } from '@@/core/history';

const Index = () => {
  const submit = React.useCallback(async (data) => {
    return storeAutoMessage(data)
      .then(() => {
        message.success('操作成功');
        history.goBack();
      })
      .catch();
  }, []);

  return (
    <PageContainer>
      <ProCard layout={'center'}>
        <RuleForm submit={submit} />
      </ProCard>
    </PageContainer>
  );
};

export default Index;
