import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { history } from '@@/core/history';
import { getAutoRules } from '@/services/auto';
import MessageContent from '../components/MessageContent';

export const replyTypeLabel: Record<API.ReplyType, string> = {
  message: '回复消息',
  transfer: '转人工客服',
};
export const matchTypeLabel: Record<API.AutoRuleMatchType, string> = {
  all: '全匹配',
  part: '包含',
};

const Index = () => {
  const columns: ProColumnType<API.AutoRule>[] = React.useMemo((): ProColumnType<API.AutoRule>[] => {
    return [
      {
        dataIndex: 'name',
        title: '名称',
        search: false,
        width: 200,
        ellipsis: true,
      },
      {
        dataIndex: 'match',
        title: '匹配文字',
        search: false,
      },
      {
        dataIndex: 'match_type',
        title: '匹配类型',
        valueEnum: matchTypeLabel,
      },
      {
        title: '回复内容',
        search: false,
        dataIndex: 'message',
        ellipsis: true,
        width: 300,
        render(dom, record) {
          if (record.reply_type === 'message' && record.message) {
            return <MessageContent message={record.message} />;
          }
          return '转人工客服';
        },
      },
      {
        dataIndex: 'is_open',
        title: '启用',
        valueType: 'switch',
      },
      {
        dataIndex: 'sort',
        title: '排序',
        search: false,
      },
      {
        dataIndex: 'count',
        title: '触发次数',
        search: false,
      },
      {
        dataIndex: 'id',
        title: '操作',
        valueType: 'option',
        render(_, record) {
          return [
            <Button
              type={'primary'}
              size={'small'}
              key={1}
              onClick={() => history.push(`/auto/rule/${record.id}/edit`)}
            >
              编辑
            </Button>,
          ];
        },
      },
    ];
  }, []);

  return (
    <PageContainer>
      <ProTable<API.AutoRule>
        request={getAutoRules}
        columns={columns}
        rowKey={'id'}
        toolBarRender={() => [
          <Button type={'primary'} onClick={() => history.push('/auto/rule/add')}>
            新增
          </Button>,
        ]}
      />
    </PageContainer>
  );
};
export default Index;
