import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Modal } from 'antd';
import { history } from '@@/core/history';
import { getAutoRules, deleteAutoRule } from '@/services/auto';
import MessageContent from '../components/MessageContent';

export const replyTypeLabel: Record<API.ReplyType, string> = {
  message: '回复消息',
  transfer: '转人工客服',
  event: '触发事件',
};
export const matchTypeLabel: Record<API.AutoRuleMatchType, string> = {
  all: '全匹配',
  part: '包含',
};

const Index = () => {
  const action = React.useRef<ActionType>();

  const columns: ProColumnType<API.AutoRule>[] = React.useMemo((): ProColumnType<API.AutoRule>[] => {
    return [
      {
        title: '#',
        valueType: 'index',
      },
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
        search: false,
      },
      {
        title: '回复内容',
        search: false,
        dataIndex: 'message',
        ellipsis: true,
        width: 300,
        render(dom, record) {
          switch (record.reply_type) {
            case 'event':
              return '触发事件';
            case 'message':
              if (record.message) {
                return <MessageContent message={record.message} />;
              }
              return <div>无</div>;
            case 'transfer':
              return '转人工客服';
            default:
              return '无';
          }
        },
      },
      {
        dataIndex: 'is_open',
        title: '启用',
        valueType: 'switch',
        search: false,
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
            <Button
              danger={true}
              type={'primary'}
              size={'small'}
              key={1}
              onClick={() => {
                Modal.confirm({
                  title: '提示',
                  content: '确定删除该消息?',
                  onOk() {
                    deleteAutoRule(record.id)
                      .then(() => {
                        action.current?.reload();
                        message.success('删除成功');
                      })
                      .catch(() => {});
                  },
                });
              }}
            >
              删除
            </Button>,
          ];
        },
      },
    ];
  }, []);

  return (
    <PageContainer extraContent="此处规则只有用户没有转接到人工客服才起效">
      <ProTable<API.AutoRule>
        actionRef={action}
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
