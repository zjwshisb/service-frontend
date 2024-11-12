import React from 'react';
import { PageContainer, ProTable, ActionType, ProColumnType } from '@ant-design/pro-components';
import { getTransfers, cancelTransfer } from '@/services';
import { Button, Modal, message } from 'antd';

const Index = () => {
  const action = React.useRef<ActionType>();

  const columns: ProColumnType<API.Transfer>[] =
    React.useMemo((): ProColumnType<API.Transfer>[] => {
      return [
        {
          dataIndex: 'username',
          title: '被转接用户',
          search: false,
        },
        {
          dataIndex: 'from_admin_name',
          title: '转接人',
          search: false,
        },
        {
          dataIndex: 'to_admin_name',
          title: '转接给',
          search: false,
        },
        {
          dataIndex: 'remark',
          title: '备注',
          search: false,
        },
        {
          dataIndex: 'created_at',
          valueType: 'dateTimeRange',
          title: '创建时间',
          search: false,
        },
        {
          dataIndex: 'accepted_at',
          valueType: 'dateTimeRange',
          title: '接入时间',
          search: false,
        },
        {
          dataIndex: 'canceled_at',
          valueType: 'dateTimeRange',
          title: '取消时间',
          search: false,
        },
        {
          dataIndex: 'id',
          title: '操作',
          search: false,
          render(_, record) {
            if (!record.canceled_at && !record.accepted_at) {
              return (
                <Button
                  danger={true}
                  size={'small'}
                  onClick={() => {
                    Modal.confirm({
                      title: '提示',
                      content: '确定取消该转接？',
                      onOk: async () => {
                        await cancelTransfer(record.id);
                        action.current?.reload();
                        message.success('操作成功');
                      },
                    });
                  }}
                >
                  取消
                </Button>
              );
            }
            return '-';
          },
        },
      ];
    }, []);

  return (
    <PageContainer>
      <ProTable<API.Transfer>
        actionRef={action}
        request={getTransfers}
        columns={columns}
        rowKey={'id'}
      />
    </PageContainer>
  );
};
export default Index;
