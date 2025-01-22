import React, { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons/lib';
import { useSnapshot } from '@umijs/max';
import { Button, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAcceptUser from '@/pages/chat/hooks/useAcceptUser';
import { getTransferMessage, handleCancelTransfer } from '@/services';
import MessageLine from '@/components/MessageLine';
import Wrapper from './Wrapper';
import transfer from '@/pages/chat/store/transfer';

const TransferUsers = () => {
  const { transfers } = useSnapshot(transfer);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messages, setMessages] = useState<API.Message[]>([]);

  const handleAccept = useAcceptUser();

  const columns = React.useMemo((): ColumnsType<API.Transfer> => {
    return [
      {
        dataIndex: 'created_at',
        title: '转接时间',
        width: '200px',
      },
      {
        dataIndex: 'from_admin_name',
        title: '来源',
      },
      {
        dataIndex: 'username',
        title: '用户',
      },
      {
        dataIndex: 'remark',
        title: '说明',
        ellipsis: true,
      },
      {
        dataIndex: 'id',
        title: '操作',
        width: 200,
        render(value, record) {
          return (
            <Space>
              <Button
                size={'small'}
                type={'primary'}
                onClick={() => handleAccept(record.to_session_id)}
              >
                接入
              </Button>
              <Button
                size={'small'}
                danger
                onClick={() => {
                  Modal.confirm({
                    title: '提示',
                    content: '确定取消该转接?',
                    onOk: async () => {
                      await handleCancelTransfer(record.id).then();
                    },
                  });
                }}
              >
                取消
              </Button>
              <Button
                size={'small'}
                onClick={() => {
                  getTransferMessage(record.id).then((res) => {
                    setMessages(res.data);
                    setMessageVisible(true);
                  });
                }}
              >
                详情
              </Button>
            </Space>
          );
        },
      },
    ];
  }, [handleAccept]);

  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Wrapper
        onClick={() => setVisible((p) => !p)}
        active={visible}
        badge={{
          count: transfers.length,
        }}
      >
        <InfoCircleOutlined />
      </Wrapper>
      <Modal
        width={600}
        open={visible}
        title={`转接用户(${transfers.length})`}
        footer={false}
        zIndex={39}
        onCancel={() => setVisible(false)}
        styles={{
          header: {
            padding: '0 10px',
          },
          content: {
            padding: '20px 0',
          },
        }}
      >
        <Table
          rowKey={'id'}
          dataSource={transfers}
          columns={columns}
          size={'small'}
          pagination={false}
        />
      </Modal>
      <Modal
        zIndex={40}
        width={'800px'}
        styles={{
          body: {
            padding: 0,
          },
        }}
        title={'会话详情'}
        open={messageVisible}
        footer={false}
        onCancel={() => setMessageVisible(false)}
      >
        <MessageLine messages={messages} />
      </Modal>
    </>
  );
};
export default TransferUsers;
