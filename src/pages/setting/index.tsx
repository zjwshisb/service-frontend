import React from 'react';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { getSettings } from '@/services';
import { App } from 'antd';

import FileItem from '@/components/FileItem';
import EditAction from '@/components/EditAction';
import useTableColumn from '@/hooks/useTableColumn';
import SettingForm from './components/SettingForm';

const Index = () => {
  const [editRow, setEditRow] = React.useState<API.Setting>();

  const { message } = App.useApp();

  const columns = useTableColumn<API.Setting>([
    {
      title: '名称',
      dataIndex: 'title',
      search: true,
      width: 150,
    },
    {
      title: '说明',
      dataIndex: 'description',
    },
    {
      title: '值',
      dataIndex: 'value',
      width: 200,
      render(_, record) {
        switch (record.type) {
          case 'select': {
            return record.options.find((v) => v.value === record.value)?.label;
          }
          case 'image': {
            if (record.value) {
              return <FileItem file={record.value as API.File}></FileItem>;
            }
            break;
          }
          case 'text': {
            return record.value as string;
          }
        }
        return '-';
      },
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 200,
      render: (_, record) => {
        return (
          <EditAction
            onClick={() => {
              setEditRow(record);
            }}
          ></EditAction>
        );
      },
    },
  ]);

  const action = React.useRef<ActionType>();

  return (
    <PageContainer>
      <SettingForm
        row={editRow}
        onCancel={() => {
          setEditRow(undefined);
        }}
        onSuccess={() => {
          setEditRow(undefined);
          message.success('操作成功').then();
          action.current?.reload();
        }}
      />
      <ProTable<API.Setting>
        actionRef={action}
        rowKey={'id'}
        columns={columns}
        request={getSettings}
        pagination={false}
      />
    </PageContainer>
  );
};
export default Index;
