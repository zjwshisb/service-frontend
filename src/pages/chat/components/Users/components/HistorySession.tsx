import React from 'react';
import { Button, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getChatSessionDetail } from '@/services';
import MessageLine from '@/components/MessageLine';
import { useSnapshot } from '@umijs/max';
import { useBoolean } from 'ahooks';
import historySession from '@/pages/chat/store/historySession';

const HistorySession = () => {
  const [messages, setMessages] = React.useState<API.Message[]>([]);

  const [open, openAction] = useBoolean(false);

  const columns: ColumnsType<API.ChatSession> = [
    {
      dataIndex: 'admin_name',
      title: '客服',
    },
    {
      dataIndex: 'accepted_at',
      title: '时间',
    },
    {
      dataIndex: 'id',
      title: '操作',
      render(val) {
        return (
          <Button
            size={'small'}
            onClick={(e) => {
              e.stopPropagation();
              getChatSessionDetail(val).then((res) => {
                setMessages(res.data.messages);
                openAction.setTrue();
              });
            }}
          >
            详情
          </Button>
        );
      },
    },
  ];

  const { visible, sessions } = useSnapshot(historySession);

  return (
    <>
      <Modal
        zIndex={1000}
        styles={{
          header: {
            padding: '10px 24px',
          },
          content: {
            padding: 0,
            paddingBottom: '10px',
          },
          body: {
            overflowY: 'auto',
          },
        }}
        footer={null}
        title={'历史对话'}
        open={visible}
        onCancel={(e) => {
          historySession.visible = false;
          e.stopPropagation();
        }}
      >
        <Table dataSource={sessions} rowKey={'id'} columns={columns} pagination={false} />
      </Modal>
      <Modal
        open={open}
        title={'对话详情'}
        zIndex={1001}
        footer={null}
        onCancel={(e) => {
          openAction.setFalse();
          e.stopPropagation();
        }}
      >
        <MessageLine messages={messages} />
      </Modal>
    </>
  );
};
export default HistorySession;
