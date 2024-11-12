import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { storeAutoMessage } from '@/services/auto';
import AutoMessageForm from '../components/Form';
import { message } from 'antd';
import { history } from '@umijs/max';

const Index = () => {
  const submit = React.useCallback(async (data: any) => {
    return storeAutoMessage(data)
      .then(() => {
        message.success('操作成功');
        history.back();
      })
      .catch();
  }, []);

  return (
    <PageContainer>
      <ProCard layout={'center'}>
        <AutoMessageForm submit={submit} />
      </ProCard>
    </PageContainer>
  );
};

export default Index;
