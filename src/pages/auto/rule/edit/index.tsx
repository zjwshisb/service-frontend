import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import RuleForm from '../components/Form';
import { useParams } from '@umijs/max';

const Index = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <PageContainer>
      <RuleForm id={id} />
    </PageContainer>
  );
};

export default Index;
