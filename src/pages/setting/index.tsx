import React from 'react';
import {
  ActionType,
  ProColumnType,
  PageContainer,
  ProTable,
  ProFormInstance,
  ProForm,
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import { getSettings, updateSetting } from '@/services';
import Upload from '@/components/Upload';
import { Form, Input, message, Select } from 'antd';

const Index = () => {
  const [editRow, setEditRow] = React.useState<API.Setting>();

  const columns = React.useMemo((): ProColumnType<API.Setting>[] => {
    return [
      {
        title: '名称',
        dataIndex: 'title',
        search: false,
      },
      {
        title: '值',
        dataIndex: 'value',
        search: false,
        valueType: (record) => record.type,
        render(dom, record) {
          if (record.type === 'select') {
            return record.options.find((v) => v.value === record.value)?.label;
          } else {
            return dom;
          }
        },
      },
      {
        title: '操作',
        valueType: 'option',
        width: 200,
        render: (text, record) => [
          <a
            key="editable"
            onClick={() => {
              setEditRow(record);
            }}
          >
            修改
          </a>,
        ],
      },
    ];
  }, []);

  const formRef = React.useRef<ProFormInstance>();

  const action = React.useRef<ActionType>();

  return (
    <PageContainer>
      <ModalForm
        width={400}
        onFinish={async (form) => {
          if (editRow) {
            await updateSetting(editRow?.id, form.value);
            setEditRow(undefined);
            message.success('操作成功');
            action.current?.reload();
          }
        }}
        formRef={formRef}
        onOpenChange={(v) => {
          if (!v) {
            setEditRow(undefined);
          } else {
            formRef.current?.setFieldsValue({
              title: editRow?.title,
              value: editRow?.value,
              type: editRow?.type,
            });
          }
        }}
        open={!!editRow}
        title={'配置修改'}
      >
        <ProForm.Group>
          <ProFormText width="xl" name="title" readonly={true} label={'配置名称'} />
        </ProForm.Group>
        <Form.Item
          shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
        >
          {({ getFieldValue }) => {
            const type = getFieldValue('type');
            switch (type) {
              case 'select': {
                return (
                  <Form.Item label={'值'} name={'value'}>
                    <Select options={editRow?.options} />
                  </Form.Item>
                );
              }
              case 'text': {
                return (
                  <Form.Item
                    label={'值'}
                    name="value"
                    rules={[
                      {
                        max: 10,
                      },
                    ]}
                  >
                    <Input placeholder="请输入名称" />
                  </Form.Item>
                );
              }
              case 'image': {
                return (
                  <Form.Item name={'value'} label={'值'}>
                    <Upload path={'system'} width={'80px'} height={'80px'} />
                  </Form.Item>
                );
              }
            }
            return <></>;
          }}
        </Form.Item>
      </ModalForm>
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
