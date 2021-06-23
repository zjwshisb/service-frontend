import React from 'react';
import type { ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getSettings } from '@/services';
import { PageContainer } from '@ant-design/pro-layout';

const Index = () => {
  const columns = React.useMemo((): ProColumnType<API.Setting>[] => {
    return [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '说明',
        dataIndex: 'description',
        search: false,
      },
      {
        title: '值',
        dataIndex: 'value',
      },
    ];
  }, []);

  return (
    <PageContainer>
      <ProTable<API.Setting>
        rowKey={'id'}
        columns={columns}
        request={getSettings}
        pagination={false}
      />
    </PageContainer>
  );
};
export default Index;
