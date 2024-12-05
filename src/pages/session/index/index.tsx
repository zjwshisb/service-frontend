import React from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { history, useModel } from '@umijs/max';
import { getChatSessions, cancelChatSessions } from '@/services';
import useTableColumn from '@/hooks/useTableColumn';
import DeleteAction from '@/components/DeleteAction';

const Index = () => {
  const { getOptions } = useModel('options');

  const columns = useTableColumn<API.ChatSession>(
    [
      {
        dataIndex: 'username',
        title: '用户',
        search: true,
      },
      {
        dataIndex: 'queried_at',
        title: '询问时间',
        width: 200,
        valueType: 'dateTimeRange',
        render(_, record) {
          return record.queried_at;
        },
        search: true,
      },
      {
        dataIndex: 'status',
        title: '状态',
        search: true,
        valueType: 'select',
        request: () => getOptions('session-status'),
      },
      {
        dataIndex: 'admin_name',
        title: '详情',
        formItemProps: {
          label: '客服',
        },
        search: true,
        render(_, record) {
          if (record.accepted_at) {
            return (
              <>
                <div>客服：{_}</div>
                <div>接入时间：{record.queried_at}</div>
              </>
            );
          }
          if (record.canceled_at) {
            return (
              <>
                <div>取消时间：{record.canceled_at}</div>
              </>
            );
          }
          return '';
        },
      },
      {
        dataIndex: 'type_label',
        title: '来源类型  ',
      },
      {
        dataIndex: 'id',
        title: '操作',
        valueType: 'option',
        render(_, record, __, action) {
          const buttons = [
            <Button size={'small'} key={1} onClick={() => history.push(`/session/${record.id}`)}>
              详情
            </Button>,
          ];
          if (record.status === 'wait') {
            buttons.push(
              <DeleteAction
                title={'取消'}
                notice={'确定取消该待接入会话'}
                id={record.id}
                onSuccess={action?.reload}
                request={cancelChatSessions}
              ></DeleteAction>,
            );
          }
          return <Space>{buttons}</Space>;
        },
      },
    ],
    {
      updated_at: false,
      created_at: false,
    },
  );
  return (
    <PageContainer>
      <ProTable<API.ChatSession>
        search={{
          defaultCollapsed: true,
        }}
        request={getChatSessions}
        columns={columns}
        rowKey={'id'}
      />
    </PageContainer>
  );
};
export default Index;
