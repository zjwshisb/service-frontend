import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { history } from '@@/core/history';
import { getAutoMessage } from '@/services/auto';

export const MessageType: Record<API.MessageType, string> = {
  text: '文本',
  image: '图片',
  navigator: '导航卡片',
};

const Index = () => {
  React.useEffect(() => {}, []);
  return (
    <PageContainer>
      <ProTable
        request={getAutoMessage}
        toolBarRender={() => [
          <Button type={'primary'} onClick={() => history.push('/auto/message/add')}>
            新增
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default Index;
