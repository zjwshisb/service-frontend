import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumnType, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Modal } from 'antd';
import { history } from '@@/core/history';
import { getChatSessions, cancelChatSessions } from '@/services';
import moment from 'moment';

const Status: Record<API.ChatSessionStatus, string> = {
  cancel: '已取消',
  accept: '已接入',
  wait: '待接入',
};

const Index = () => {
  const action = React.useRef<ActionType>();

  const columns: ProColumnType<API.ChatSession>[] = React.useMemo((): ProColumnType<API.ChatSession>[] => {
    return [
      {
        dataIndex: 'user_name',
        title: '用户',
      },
      {
        dataIndex: 'queried_at',
        title: '询问时间',
        width: 200,
        valueType: 'dateTimeRange',
        render(_, record) {
          return moment(record.queried_at).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      {
        dataIndex: 'status',
        title: '状态',
        valueEnum: Status,
      },
      {
        dataIndex: 'admin_name',
        title: '详情',
        formItemProps: {
          label: '客服',
        },
        render(_, record) {
          if (record.accepted_at > 0) {
            return (
              <>
                <div>客服：{_}</div>
                <div>接入时间：{moment(record.queried_at).format('YYYY-MM-DD HH:mm:ss')}</div>
              </>
            );
          }
          if (record.canceled_at > 0) {
            return (
              <>
                <div>取消时间：{moment(record.canceled_at).format('YYYY-MM-DD HH:mm:ss')}</div>
              </>
            );
          }
          return '';
        },
      },
      {
        dataIndex: 'type_label',
        title: '来源类型  ',
        search: false,
      },
      {
        dataIndex: 'id',
        title: '操作',
        valueType: 'option',
        render(_, record) {
          const buttons = [
            <Button
              type={'primary'}
              size={'small'}
              key={1}
              onClick={() => history.push(`/session/${record.id}`)}
            >
              详情
            </Button>,
          ];
          if (record.status !== 'wait') {
            buttons.push(
              <Button
                size={'small'}
                key={2}
                danger={true}
                onClick={() => {
                  Modal.confirm({
                    title: '提示',
                    content: '确定取消该待接入会话？',
                    async onOk() {
                      try {
                        await cancelChatSessions(record.id);
                        message.success('操作成功');
                        action.current?.reload();
                        return true;
                      } catch (e) {
                        if (e.name === 'BizError') {
                          message.error(e.data.message);
                        }
                        return false;
                      }
                    },
                  });
                }}
              >
                取消
              </Button>,
            );
          }
          return buttons;
        },
      },
    ];
  }, []);

  return (
    <PageContainer>
      <ProTable<API.ChatSession>
        actionRef={action}
        request={getChatSessions}
        columns={columns}
        rowKey={'id'}
      />
    </PageContainer>
  );
};
export default Index;
