import React from 'react';
import { Modal, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getChatSessionDetail } from '@/services';
import MessageLine from '@/components/MessageLine';
import { useModel } from '@umijs/max';
import { useBoolean } from 'ahooks';

const Index = () => {
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
                openAction.setTrue();
                setMessages(res.data.messages);
              });
            }}
          >
            详情
          </Button>
        );
      },
    },
  ];

  const { visible, setVisible, sessions } = useModel('chat.historySession');

  return (
    <>
      <Modal
        zIndex={5000}
        styles={{
          body: {
            padding: 0,
            maxHeight: '100px',
          },
        }}
        footer={null}
        title={'历史对话'}
        open={visible}
        onCancel={(e) => {
          setVisible(false);
          e.stopPropagation();
        }}
      >
        <Table dataSource={sessions} rowKey={'id'} columns={columns} pagination={false} />
      </Modal>
      <Modal
        open={open}
        title={'对话详情'}
        zIndex={5001}
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
export default Index;
