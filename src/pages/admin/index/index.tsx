import React from 'react';
import { getAdmins } from '@/services';
import { Button } from 'antd';
import { history } from '@@/core/history';
import { ProTable, ActionType, PageContainer } from '@ant-design/pro-components';
import useTableColumn from '@/hooks/useTableColumn';

const Index = () => {
  const action = React.useRef<ActionType>();

  const columns = useTableColumn<API.Admin>([
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
      fixed: 'right',
      search: false,
      render(_, record) {
        return (
          <Button size={'small'} onClick={() => history.push(`/admin/${record.id}`)}>
            详情
          </Button>
        );
      },
    },
  ]);

  return (
    <PageContainer>
      <ProTable<API.Admin> actionRef={action} request={getAdmins} columns={columns} rowKey={'id'} />
    </PageContainer>
  );
};

export default Index;
