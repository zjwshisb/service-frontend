import React from 'react';
import { MessageOutlined } from '@ant-design/icons/lib';
import { useModel } from '@umijs/max';
import { Avatar, Button, List, Modal, Popover, Skeleton, Typography } from 'antd';
import DraggableView from '@/components/DraggableView';
import { getMessageTypeLabel } from '@/pages/chat/util';
import useAcceptUser from '@/pages/chat/hooks/useAcceptUser';
import { cancelChatSessions } from '@/services';
import MenuItem from '@/pages/chat/components/Menu/components/MenuItem';
import { If, Then } from 'react-if';

const Index = () => {
  const { setOnMessage } = useModel('chat.websocket');

  const { waitingUsers, setWaitingUsers } = useModel('chat.waitingUsers');
  const { notify } = useModel('chat.notification');

  React.useEffect(() => {
    setOnMessage((action: API.Action<API.WaitingUser[]>) => {
      if (action.action === 'waiting-users') {
        setWaitingUsers((prevState) => {
          if (prevState.length < action.data.length) {
            notify('有新的用户待接入');
          }
          return action.data;
        });
      }
    }, 'waiting-users');
  }, [notify, setOnMessage, setWaitingUsers]);

  const accept = useAcceptUser();

  const reverseData = React.useMemo(() => {
    return [...waitingUsers].reverse();
  }, [waitingUsers]);

  return (
    <DraggableView
      title={'待接入用户'}
      width={'400px'}
      trigger={(visible) => (
        <MenuItem title={'待接入用户'} active={visible}>
          <MessageOutlined />
        </MenuItem>
      )}
    >
      <List
        itemLayout="horizontal"
        dataSource={reverseData}
        size={'small'}
        renderItem={(item) => (
          <List.Item
            styles={{
              actions: {
                marginLeft: 10,
              },
            }}
            actions={[
              <Button
                size={'small'}
                type={'text'}
                key={'accept'}
                onClick={(e) => {
                  accept(item.session_id);
                  e.stopPropagation();
                }}
              >
                接入
              </Button>,
              <Button
                size={'small'}
                type={'text'}
                danger={true}
                key={'refuse'}
                className={'red-6'}
                onClick={(e) => {
                  Modal.confirm({
                    title: '提示',
                    content: '确定拒绝该会话?',
                    async onOk() {
                      await cancelChatSessions(item.session_id);
                    },
                  });
                  e.stopPropagation();
                }}
              >
                拒绝
              </Button>,
            ]}
          >
            <Skeleton avatar title={false} active loading={false}>
              <Popover
                content={
                  <List
                    className={'max-w-96'}
                    dataSource={[...item.messages].reverse()}
                    size={'small'}
                    renderItem={(i) => {
                      return (
                        <List.Item className={'overflow-hidden flex items-center'}>
                          <span className={'flex-shrink-0'}>{i.time}</span>
                          <Typography.Text ellipsis={true} className={'ml-2'}>
                            {getMessageTypeLabel(i.content, i.type)}
                          </Typography.Text>
                        </List.Item>
                      );
                    }}
                  />
                }
                placement={'bottom'}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar}>{item.username}</Avatar>}
                  title={
                    <div className={'w-full text-sm'}>
                      <div>{item.username}</div>
                      <div>{item.last_time}</div>
                    </div>
                  }
                  description={
                    <If condition={item.messages.length > 0}>
                      <Then>
                        {() => (
                          <Typography.Text ellipsis={true}>
                            {item.messages.length > 0
                              ? getMessageTypeLabel(
                                  item.messages[item.messages.length - 1].content,
                                  item.messages[item.messages.length - 1].type,
                                )
                              : ''}
                          </Typography.Text>
                        )}
                      </Then>
                    </If>
                  }
                />
              </Popover>
            </Skeleton>
          </List.Item>
        )}
      />
    </DraggableView>
  );
};
export default Index;
