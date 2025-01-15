import React from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import useTableColumn from '@/hooks/useTableColumn';
import { getChatFiles, deleteChatFile } from '@/services';
import FileItem from '@/components/FileItem';
import DeleteAction from '@/components/DeleteAction';
import { getDefaultConfig } from '@/utils/table';

const Index = () => {
  const columns = useTableColumn<API.ChatFile>(
    [
      {
        dataIndex: 'user_name',
        title: '来源',
        render(_, record) {
          if (record.user_name) {
            return <div>用户: {record.user_name}</div>;
          } else {
            return <div>客服: {record.admin_name}</div>;
          }
        },
      },
      {
        dataIndex: 'url',
        title: '文件',
        render: (_, record) => {
          return <FileItem file={record} />;
        },
      },
      {
        dataIndex: 'created_at',
        title: '发送时间',
      },
      {
        dataIndex: 'id',
        title: '操作',
        render(_, record, __, action) {
          return (
            <DeleteAction onSuccess={action?.reload} id={record.id} request={deleteChatFile} />
          );
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
      <ProTable<API.ChatFile> {...getDefaultConfig()} request={getChatFiles} columns={columns} />
    </PageContainer>
  );
};
export default Index;
