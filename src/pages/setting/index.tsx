import React from 'react';
import {
  ActionType,
  PageContainer,
  ProTable,
  ProFormInstance,
  ProForm,
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import { getSettings, updateSetting } from '@/services';
import { App, Form, Input, Select } from 'antd';
import ProFormFileSelect from '@/components/ProFormFileSelect';
import FileItem from '@/components/FileItem';
import EditAction from '@/components/EditAction';
import useTableColumn from '@/hooks/useTableColumn';

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
      render: (text, record) => {
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

  const formRef = React.useRef<ProFormInstance>();

  const action = React.useRef<ActionType>();

  return (
    <PageContainer>
      <ModalForm
        width={500}
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
                  <ProFormFileSelect
                    fieldProps={{
                      type: 'image',
                    }}
                    name={'value'}
                    label={'值'}
                  />
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
