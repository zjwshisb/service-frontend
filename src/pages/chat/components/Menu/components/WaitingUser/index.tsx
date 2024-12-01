import React from 'react';
import { MessageOutlined } from '@ant-design/icons/lib';
import { useModel } from '@umijs/max';
import { App, Avatar, Badge, List, Modal, Popover, Skeleton, Typography } from 'antd';
import { timeFormat } from '@/utils';
import myStyles from './index.less';
import DraggableView from '@/components/DraggableView';
import { getMessageTypeLabel } from '@/pages/chat/util';
import useAcceptUser from '@/pages/chat/hooks/useAcceptUser';
import { cancelChatSessions } from '@/services';
import MenuItem from '@/pages/chat/components/Menu/components/MenuItem';

const Index = () => {
  const { setOnMessage } = useModel('chat.websocket');

  const { waitingUsers, setWaitingUsers } = useModel('chat.waitingUsers');
  const { notify } = useModel('chat.notification');

  const { message } = App.useApp();

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
        locale={{
          emptyText: '暂无数据',
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a
                key={'accept'}
                onClick={(e) => {
                  accept(item.session_id);
                  e.stopPropagation();
                }}
              >
                接入
              </a>,
              <a
                key={'refuse'}
                className={'red-6'}
                onClick={(e) => {
                  Modal.confirm({
                    title: '提示',
                    content: '确定拒绝该会话?',
                    onOk() {
                      cancelChatSessions(item.session_id)
                        .then()
                        .catch((err) => {
                          if (err && err.message) {
                            message.error(err.message);
                          }
                        });
                    },
                  });
                  e.stopPropagation();
                }}
              >
                拒绝
              </a>,
            ]}
          >
            <Skeleton avatar title={false} active loading={false}>
              <Popover
                content={
                  <List
                    dataSource={[...item.messages].reverse()}
                    size={'small'}
                    className={myStyles.simpleMessage}
                    renderItem={(i) => {
                      return (
                        <List.Item className={myStyles.msgItem}>
                          <span className={myStyles.time}>{i.time}</span>
                          <span className={myStyles.msg}>
                            {getMessageTypeLabel(i.content, i.type)}
                          </span>
                        </List.Item>
                      );
                    }}
                  />
                }
                placement={'bottom'}
              >
                <List.Item.Meta
                  className={myStyles.listItem}
                  avatar={<Avatar src={item.avatar}>{item.username}</Avatar>}
                  title={
                    <div>
                      <span>{item.username}</span>
                      <span className={myStyles.time} style={{ marginLeft: '20px' }}>
                        {timeFormat(item.last_time)}
                      </span>
                    </div>
                  }
                  description={
                    <Badge
                      count={item.message_count}
                      size={'small'}
                      className={myStyles.messageContent}
                    >
                      <Typography.Text ellipsis={true} className={myStyles.messageContent}>
                        {item.messages.length > 0
                          ? getMessageTypeLabel(
                              item.messages[item.messages.length - 1].content,
                              item.messages[item.messages.length - 1].type,
                            )
                          : ''}
                      </Typography.Text>
                    </Badge>
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
