import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import AutoMessageForm from '../components/Form';
import { useParams } from '@umijs/max';

const Index: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <PageContainer>
      <AutoMessageForm id={id} />
    </PageContainer>
  );
};

export default Index;
