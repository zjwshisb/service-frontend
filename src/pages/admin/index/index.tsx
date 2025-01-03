import React from 'react';
import { getAdmins } from '@/services';
import { Button } from 'antd';
import { history } from '@@/core/history';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import useTableColumn from '@/hooks/useTableColumn';

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
    {
      dataIndex: 'id',
      title: '操作',
      fixed: 'right',
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
