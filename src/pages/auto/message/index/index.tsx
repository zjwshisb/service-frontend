import React from 'react';
import { ProTable, PageContainer, ActionType, ProColumnType } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import { history } from '@@/core/history';
import { getAutoMessage, deleteAutoMessage } from '@/services/auto';
import MessageContent from '../../components/MessageContent';

export const MessageType: Record<API.MessageType, string> = {
  text: '文本',
  image: '图片',
  navigator: '导航卡片',
};

const Index = () => {
  const actionRef = React.useRef<ActionType>();

  const columns: ProColumnType<API.AutoMessage>[] =
    React.useMemo((): ProColumnType<API.AutoMessage>[] => {
      return [
        {
          title: '#',
          valueType: 'index',
        },
        {
          dataIndex: 'name',
          title: '消息名称',
          search: false,
        },
        {
          dataIndex: 'type',
          valueEnum: MessageType,
          title: '消息类型',
        },
        {
          dataIndex: 'content',
          title: '消息内容',
          search: false,
          ellipsis: true,
          width: 300,
          render(text, record) {
            return <MessageContent message={record} />;
          },
        },
        {
          dataIndex: 'created_at',
          valueType: 'dateTime',
          title: '创建时间',
          search: false,
        },
        {
          dataIndex: 'updated_at',
          valueType: 'dateTime',
          title: '最后修改时间',
          search: false,
        },
        {
          dataIndex: 'id',
          title: '操作',
          valueType: 'option',
          render(_, record) {
            const action = [
              <Button
                type={'primary'}
                size={'small'}
                key={1}
                onClick={() => history.push(`/auto/message/${record.id}/edit`)}
              >
                编辑
              </Button>,
            ];
            if (record.rules_count <= 0) {
              action.push(
                <Button
                  type={'primary'}
                  size={'small'}
                  danger={true}
                  key={2}
                  onClick={() => {
                    Modal.confirm({
                      title: '提示',
                      content: '确定删除该消息?',
                      onOk() {
                        deleteAutoMessage(record.id)
                          .then(() => {
                            message.success('操作成功');
                            actionRef.current?.reload();
                          })
                          .catch();
                      },
                    });
                  }}
                >
                  删除
                </Button>,
              );
            }
            return action;
          },
        },
      ];
    }, []);
  return (
    <PageContainer>
      <ProTable
        form={{
          labelWidth: 100,
        }}
        actionRef={actionRef}
        rowKey={'id'}
        columns={columns}
        request={getAutoMessage}
        toolBarRender={() => [
          <Button key={'edit'} type={'primary'} onClick={() => history.push('/auto/message/add')}>
            新增
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default Index;
