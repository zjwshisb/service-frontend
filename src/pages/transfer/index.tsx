import React from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getTransfers, cancelTransfer } from '@/services';
import DeleteAction from '@/components/DeleteAction';
import useTableColumn from '@/hooks/useTableColumn';

const Index = () => {
  const columns = useTableColumn<API.Transfer>(
    [
      {
        dataIndex: 'username',
        title: '被转接用户',
        search: true,
      },
      {
        dataIndex: 'from_admin_name',
        title: '转接人',
        search: true,
      },
      {
        dataIndex: 'to_admin_name',
        title: '转接给',
        search: true,
      },
      {
        dataIndex: 'remark',
        title: '备注',
      },
      {
        dataIndex: 'status',
        title: '状态',
        render(_, record) {
          return (
            <div>
              <div>{_}</div>
              {record.canceled_at && <div>取消时间: {record.canceled_at}</div>}
              {record.accepted_at && <div>接入时间: {record.accepted_at}</div>}
            </div>
          );
        },
      },
      {
        dataIndex: 'id',
        title: '操作',
        fixed: 'right',
        render(_, record, __, action) {
          if (!record.canceled_at && !record.accepted_at) {
            return (
              <DeleteAction
                request={cancelTransfer}
                notice={'确定取消该转接'}
                title={'取消'}
                onSuccess={action?.reload}
                id={record.id}
              />
            );
          }
          return '-';
        },
      },
    ],
    {
      updated_at: false,
    },
  );

  return (
    <PageContainer>
      <ProTable<API.Transfer>
        search={{
          defaultCollapsed: false,
        }}
        request={getTransfers}
        columns={columns}
        rowKey={'id'}
      />
    </PageContainer>
  );
};
export default Index;
