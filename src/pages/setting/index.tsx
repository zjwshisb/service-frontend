import React from 'react';
import type { ProColumnType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { getSettings, updateSetting } from '@/services';
import { PageContainer } from '@ant-design/pro-layout';
import type { FormInstance } from 'antd';
import { message } from 'antd';

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
        fieldProps: (_: FormInstance, config: { entity: { options: API.Option[] } }) => {
          return {
            options: config.entity.options,
          };
        },
        render: (_, record) => {
          const select = record.options.find((v) => v.value === record.value);
          if (select) {
            return select.label;
          }
          return '';
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
              action?.startEditable?.(record.id);
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
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.save, defaultDoms.cancel];
          },
          onSave: async (name, row) => {
            await updateSetting(name.toString(), row.value);
            message.success('修改成功');
            return true;
          },
        }}
        rowKey={'id'}
        columns={columns}
        request={getSettings}
        pagination={false}
      />
    </PageContainer>
  );
};
export default Index;
