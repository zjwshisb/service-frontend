import React from 'react';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Space } from 'antd';
import { getAutoMessage, deleteAutoMessage } from '@/services/auto';
import DeleteAction from '@/components/DeleteAction';
import EditAction from '@/components/EditAction';
import StoreAction from '@/components/StoreAction';
import useTableColumn from '@/hooks/useTableColumn';
import MessageContent from '@/pages/auto/message/components/MessageContent';
import { useModel } from '@@/exports';
import { getDefaultConfig } from '@/utils/table';

const Index = () => {
  const { getOptions } = useModel('options');
  const columns = useTableColumn<API.AutoMessage>([
    {
      dataIndex: 'name',
      title: '消息名称',
      search: true,
    },
    {
      dataIndex: 'type',
      request: () => getOptions('message-types'),
      title: '消息类型',
      valueType: 'select',
      width: 100,
      search: true,
    },
    {
      dataIndex: 'content',
      title: '消息内容',
      width: 300,
      render(_, message) {
        return <MessageContent message={message} />;
      },
    },
    {
      dataIndex: 'id',
      title: '操作',
      fixed: 'right',
      width: 150,
      render(_, record, __, action) {
        return (
          <Space>
            <EditAction key="edit" path={`/auto/message/${record.id}/edit`} />
            <DeleteAction
              onSuccess={action?.reload}
              key={'delete'}
              id={record.id}
              request={deleteAutoMessage}
            ></DeleteAction>
          </Space>
        );
      },
    },
  ]);
  return (
    <PageContainer>
      <ProTable<API.AutoMessage>
        {...getDefaultConfig()}
        columns={columns}
        request={getAutoMessage}
        toolBarRender={() => [<StoreAction key={'store'} path={'/auto/message/add'}></StoreAction>]}
      />
    </PageContainer>
  );
};

export default Index;
