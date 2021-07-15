import React from 'react';
import type { ProColumnType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { getSettings, updateSetting } from '@/services';
import { PageContainer } from '@ant-design/pro-layout';

const Index = () => {
  const columns = React.useMemo((): ProColumnType<API.Setting>[] => {
    return [
      {
        title: '名称',
        dataIndex: 'title',
        editable: false,
      },
      {
        title: '值',
        dataIndex: 'value',
        valueType: 'select',
        valueEnum: (row) => {
          return row.options;
        },
      },
      {
        title: '操作',
        valueType: 'option',
        width: 200,
        render: (text, record, _, action) => [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.name);
            }}
          >
            编辑
          </a>,
        ],
      },
    ];
  }, []);

  return (
    <PageContainer>
      <EditableProTable<API.Setting>
        recordCreatorProps={false}
        editable={{
          type: 'single',
          onSave: async (name, row) => {
            return await updateSetting(name.toString(), row.value);
          },
        }}
        rowKey={'name'}
        columns={columns}
        request={getSettings}
        pagination={false}
      />
    </PageContainer>
  );
};
export default Index;
