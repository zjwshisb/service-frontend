import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import AutoMessageForm from '../components/Form';
import { useParams } from '@umijs/max';

const Index: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <PageContainer>
      <ProCard layout={'center'}>
        <AutoMessageForm id={id} />
      </ProCard>
    </PageContainer>
  );
};

export default Index;
