import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import AutoMessageForm from '../components/Form';

const Index = () => {
  return (
    <PageContainer>
      <ProCard layout={'center'}>
        <AutoMessageForm />
      </ProCard>
    </PageContainer>
  );
};

export default Index;
