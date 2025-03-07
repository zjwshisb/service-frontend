import React from 'react';
import { getAdmins } from '@/services';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import useTableColumn from '@/hooks/useTableColumn';
import { getDefaultConfig } from '@/utils/table';
import StoreAction from '@/components/StoreAction';

const Index = () => {
  const action = React.useRef<ActionType>();

  const columns = useTableColumn<API.Admin>([
    {
      title: '用户名',
      dataIndex: 'username',
      search: true,
    },
    {
      title: '在线情况',
      dataIndex: 'online',
      width: 100,
      valueType: 'switch',
      render(_, record) {
        return record.online ? (
          <span className={'text-green-600'}>在线</span>
        ) : (
          <span className={'text-red-600'}>离线</span>
        );
      },
    },
    {
      dataIndex: 'accepted_count',
      title: '当前接待数量',
    },
  ]);

  return (
    <PageContainer>
      <ProTable<API.Admin>
        {...getDefaultConfig()}
        toolBarRender={() => [<StoreAction key={'store'} path={'/admin/add'}></StoreAction>]}
        actionRef={action}
        request={getAdmins}
        columns={columns}
      />
    </PageContainer>
  );
};

export default Index;
