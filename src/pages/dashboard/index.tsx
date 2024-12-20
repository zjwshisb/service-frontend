import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import { Col, Row } from 'antd';
import Admin from './components/Admin';
import OnlineUser from './components/OnlineUser';

const Index: React.FC = () => {
  return (
    <PageContainer title={false} pageHeaderRender={false}>
      <Row gutter={20}>
        <Col xs={24} sm={8} className={'mb-5'}>
          <Admin />
        </Col>
        <Col xs={24} sm={8} className={'mb-5'}>
          <OnlineUser />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Index;
