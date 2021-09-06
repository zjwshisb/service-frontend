import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAdmins } from '@/services';
import { Button } from 'antd';
import { history } from '@@/core/history';

const Index = () => {
  const action = React.useRef<ActionType>();

  const columns: ProColumnType<API.Admin>[] = React.useMemo((): ProColumnType<API.Admin>[] => {
    return [
      {
        title: '#',
        valueType: 'index',
      },
      {
        dataIndex: 'username',
        title: '用户名',
      },
      {
        dataIndex: 'avatar',
        title: '头像',
        valueType: 'image',
        search: false,
      },
      {
        title: '在线',
        dataIndex: 'online',
        search: false,
        render(_, record) {
          return record.online ? (
            <span className={'green-6'}>在线</span>
          ) : (
            <span className={'red-6'}>离线</span>
          );
        },
      },
      {
        dataIndex: 'accepted_count',
        title: '当前接待数量',
        search: false,
      },
      {
        dataIndex: 'id',
        title: '操作',
        search: false,
        render(_, record) {
          return (
            <Button size={'small'} onClick={() => history.push(`/admin/${record.id}`)}>
              详情
            </Button>
          );
        },
      },
    ];
  }, []);

  return (
    <PageContainer>
      <ProTable<API.Admin> actionRef={action} request={getAdmins} columns={columns} rowKey={'id'} />
    </PageContainer>
  );
};
export default Index;
