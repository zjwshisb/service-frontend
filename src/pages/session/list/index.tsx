import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { history } from '@@/core/history';
import { getChatSessions } from '@/services';
import moment from 'moment';

const Index = () => {
  const columns: ProColumnType<API.ChatSession>[] = React.useMemo((): ProColumnType<API.ChatSession>[] => {
    return [
      {
        dataIndex: 'user_name',
        title: '用户',
        search: false,
      },
      {
        dataIndex: 'queried_at',
        title: '询问时间',
        width: 200,
        valueType: 'dateTimeRange',
        render(_, record) {
          return moment(record.queried_at).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      {
        dataIndex: 'accepted_at',
        title: '接入时间',
        search: false,
        valueType: 'dateTime',
      },
      {
        dataIndex: 'admin_name',
        title: '客服',
      },
      {
        dataIndex: 'broke_at',
        title: '断开时间',
        search: false,
        valueType: 'dateTime',
      },
      {
        dataIndex: 'id',
        title: '操作',
        valueType: 'option',
        render(_, record) {
          return [
            <Button
              type={'primary'}
              size={'small'}
              key={1}
              onClick={() => history.push(`/session/${record.id}`)}
            >
              详情
            </Button>,
          ];
        },
      },
    ];
  }, []);

  return (
    <PageContainer>
      <ProTable<API.ChatSession> request={getChatSessions} columns={columns} rowKey={'id'} />
    </PageContainer>
  );
};
export default Index;
