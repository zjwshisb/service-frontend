import React from 'react';
import { getAdmins } from '@/services';
import { Button } from 'antd';
import { history } from '@@/core/history';
import { ProTable, ProColumnType, ActionType, PageContainer } from '@ant-design/pro-components';

const columns: ProColumnType<API.Admin>[] = [
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
    title: '在线情况',
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

const Table = () => {
  const action = React.useRef<ActionType>();
  return (
    <PageContainer>
      <ProTable<API.Admin> actionRef={action} request={getAdmins} columns={columns} rowKey={'id'} />
    </PageContainer>
  );
};

const Index = () => {
  return <Table />;
};
export default Index;
