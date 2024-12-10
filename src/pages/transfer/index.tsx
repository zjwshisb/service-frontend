import React from 'react';
import { PageContainer, ProTable, ActionType } from '@ant-design/pro-components';
import { getTransfers, cancelTransfer } from '@/services';
import DeleteAction from '@/components/DeleteAction';
import useTableColumn from '@/hooks/useTableColumn';

const Index = () => {
  const action = React.useRef<ActionType>();

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
        dataIndex: 'created_at',
        title: '创建时间',
      },
      {
        dataIndex: 'accepted_at',
        title: '接入时间',
      },
      {
        dataIndex: 'canceled_at',
        title: '取消时间',
      },
      {
        dataIndex: 'id',
        title: '操作',
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
      created_at: false,
      updated_at: false,
    },
  );

  return (
    <PageContainer>
      <ProTable<API.Transfer>
        search={{
          defaultCollapsed: false,
        }}
        actionRef={action}
        request={getTransfers}
        columns={columns}
        rowKey={'id'}
      />
    </PageContainer>
  );
};
export default Index;
