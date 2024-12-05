import React from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
import { getAutoRules, deleteAutoRule } from '@/services/auto';
import useTableColumn from '@/hooks/useTableColumn';
import StoreAction from '@/components/StoreAction';
import DeleteAction from '@/components/DeleteAction';
import EditAction from '@/components/EditAction';
import MessageContent from '@/pages/auto/message/components/MessageContent';
import { useModel } from '@umijs/max';

const Index = () => {
  const { getOptions } = useModel('options');

  const columns = useTableColumn<API.AutoRule>([
    {
      dataIndex: 'name',
      title: '名称',
      width: 200,
      ellipsis: true,
      search: true,
    },
    {
      dataIndex: 'match',
      title: '匹配文字',
      width: 200,
    },
    {
      dataIndex: 'match_type',
      title: '匹配类型',
      search: true,
      width: 120,
      valueType: 'select',
      request: () => getOptions('auto-rule-match-types'),
    },
    {
      title: '回复内容',
      dataIndex: 'reply_type',
      request: () => getOptions('auto-rule-reply-types'),
      formItemProps: {
        label: '回复类型',
      },
      search: true,
      width: 300,
      render(dom, record) {
        switch (record.reply_type) {
          case 'message':
            if (record.message) {
              return <MessageContent message={record.message} />;
            }
            return '-';
          case 'transfer':
            return '转人工客服';
          default:
            return '-';
        }
      },
    },
    {
      dataIndex: 'scenes',
      title: '触发场景',
      request: () => getOptions('auto-rule-scenes'),
      valueType: 'select',
      width: 300,
    },
    {
      dataIndex: 'is_open',
      title: '启用',
      width: 70,
      search: true,
      valueType: 'switch',
    },
    {
      dataIndex: 'sort',
      title: '排序',
      width: 50,
    },
    {
      dataIndex: 'count',
      title: '触发次数',
      width: 100,
    },
    {
      dataIndex: 'id',
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      render(_, record, __, action) {
        return (
          <Space>
            <EditAction path={`/auto/rule/${record.id}/edit`} />
            <DeleteAction onSuccess={action?.reload} id={record.id} request={deleteAutoRule} />
          </Space>
        );
      },
    },
  ]);

  return (
    <PageContainer>
      <ProTable<API.AutoRule>
        scroll={{
          x: 1200,
        }}
        search={{
          collapsed: false,
        }}
        request={getAutoRules}
        columns={columns}
        rowKey={'id'}
        toolBarRender={() => [<StoreAction path={'/auto/rule/add'} key={'store'} />]}
      />
    </PageContainer>
  );
};

export default Index;
