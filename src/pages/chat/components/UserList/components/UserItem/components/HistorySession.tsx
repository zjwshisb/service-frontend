import React from 'react';
import { Modal, Table, Button } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { getChatSessionDetail } from '@/services';
import MessageLine from '@/components/MessageLine';

const Index = () => {
  const [messages, setMessages] = React.useState<API.Message[]>([]);
  const [messageVisible, setMessageVisible] = React.useState(false);

  const columns: ColumnsType<API.ChatSession> = [
    {
      dataIndex: 'admin_name',
      title: '客服',
    },
    {
      dataIndex: 'accepted_at',
      title: '时间',
      render(val) {
        return moment(val).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      dataIndex: 'id',
      title: '操作',
      render(val) {
        return (
          <Button
            size={'small'}
            onClick={() => {
              getChatSessionDetail(val).then((res) => {
                setMessageVisible(true);
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

  const { visible, setVisible, sessions } = useModel('useHistorySessionModal');

  return (
    <>
      <Modal
        zIndex={5000}
        bodyStyle={{ padding: 0, maxHeight: '100px' }}
        footer={null}
        title={'历史对话'}
        visible={visible}
        onCancel={(e) => {
          setVisible(false);
          e.stopPropagation();
        }}
      >
        <Table dataSource={sessions} columns={columns} pagination={false} />
      </Modal>
      <Modal
        visible={messageVisible}
        title={'对话详情'}
        zIndex={5001}
        footer={null}
        onCancel={(e) => {
          setMessageVisible(false);
          e.stopPropagation();
        }}
      >
        <MessageLine messages={messages} />
      </Modal>
    </>
  );
};
export default Index;
