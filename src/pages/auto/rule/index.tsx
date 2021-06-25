import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { history } from '@@/core/history';

export const ReplyTypeLabel: Record<API.ReplyType, string> = {
  message: '回复消息',
  transfer: '转人工客服',
};
export const MatchTypeLabel: Record<API.AutoRuleMatchType, string> = {
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
      },
      {
        dataIndex: 'match',
        title: '匹配文字',
        search: false,
      },
      {
        dataIndex: 'match_type',
        title: '匹配类型',
        valueEnum: MatchTypeLabel,
      },
      {
        dataIndex: 'reply_type',
        title: '回复类型',
        valueEnum: ReplyTypeLabel,
      },
      {
        dataIndex: 'reply_content',
        title: '回复内容',
      },
      {
        dataIndex: 'sort',
        title: '排序',
      },
      {
        dataIndex: 'count',
        title: '触发次数',
      },
    ];
  }, []);

  return (
    <PageContainer>
      <ProTable<API.AutoRule>
        columns={columns}
        toolBarRender={() => [
          <Button type={'primary'} onClick={() => history.push('/auto/message/add')}>
            新增
          </Button>,
        ]}
      />
    </PageContainer>
  );
};
export default Index;
