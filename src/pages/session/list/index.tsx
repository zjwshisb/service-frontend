import React from 'react';
import { PageContainer, ProColumnType, ActionType, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import { history } from '@umijs/max';
import { getChatSessions, cancelChatSessions } from '@/services';

const Status: Record<API.ChatSessionStatus, string> = {
  cancel: '已取消',
  accept: '已接入',
  wait: '待接入',
};
const Table = () => {
  const action = React.useRef<ActionType>();

  const columns: ProColumnType<API.ChatSession>[] =
    React.useMemo((): ProColumnType<API.ChatSession>[] => {
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
            if (record.accepted_at) {
              return (
                <>
                  <div>客服：{_}</div>
                  <div>接入时间：{record.queried_at}</div>
                </>
              );
            }
            if (record.canceled_at) {
              return (
                <>
                  <div>取消时间：{record.canceled_at}</div>
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
            if (record.status === 'wait') {
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
                          // if (e.name === 'BizError') {
                          //   message.error(e.data.message);
                          // }
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
    <ProTable<API.ChatSession>
      actionRef={action}
      request={getChatSessions}
      columns={columns}
      rowKey={'id'}
    />
  );
};
const Index = () => {
  return (
    <PageContainer>
      <Table />
    </PageContainer>
  );
};
export default Index;
