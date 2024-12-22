import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import { Col, Row } from 'antd';
import Admin from './components/Admin';
import OnlineUser from './components/OnlineUser';
import WaitingUser from './components/WaitingUser';

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
        <Col xs={24} sm={8} className={'mb-5'}>
          <WaitingUser />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Index;
