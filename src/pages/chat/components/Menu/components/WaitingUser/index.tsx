import React from 'react';
import { MessageOutlined } from '@ant-design/icons/lib';
import { useModel } from '@@/plugin-model/useModel';
import { List, Skeleton, Avatar, Badge, Tooltip, Modal, Popover } from 'antd';
import { timeFormat } from '@/utils';
import styles from '../index.less';
import myStyles from './index.less';
import DraggableView from '@/components/DraggableView';
import { getMessageTypeLabel } from '@/pages/chat/util';
import { Typography } from 'antd';
import useAcceptUser from '@/hooks/useAcceptUser';
import { cancelChatSessions } from '@/services';
import moment from 'moment';

const Index = () => {
  const { setOnMessage } = useModel('useWebsocketModel');

  const { waitingUsers, setWaitingUsers } = useModel('useWaitingUserModel');
  const { setting } = useModel('useSettingModel');

  React.useEffect(() => {
    setOnMessage((action: API.Action<API.WaitingUser[]>) => {
      if (action.action === 'waiting-users') {
        setWaitingUsers(action.data);
      }
    }, 'waiting-users');
  }, [setOnMessage, setWaitingUsers]);

  const accept = useAcceptUser();

  React.useEffect(() => {
    if (setting?.is_auto_accept) {
      if (waitingUsers.length > 0) {
        accept(waitingUsers[0].session_id);
      }
    }
  }, [accept, setting, waitingUsers]);

  const reverseData = React.useMemo(() => {
    return [...waitingUsers].reverse();
  }, [waitingUsers]);

  return React.useMemo(() => {
    return (
      <DraggableView
        title={'待接入用户'}
        width={'400px'}
        trigger={(visible) => (
          <Tooltip title={'待接入用户'} placement={'left'}>
            <div className={styles.item}>
              <Badge count={reverseData.length} size={'small'}>
                <MessageOutlined className={styles.icon} data-active={visible} />
              </Badge>
            </div>
          </Tooltip>
        )}
      >
        <List
          itemLayout="horizontal"
          dataSource={reverseData}
          rowKey={'id'}
          size={'small'}
          locale={{
            emptyText: '暂无数据',
          }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  onClick={(e) => {
                    accept(item.session_id);
                    e.stopPropagation();
                  }}
                >
                  接入
                </a>,
                <a
                  className={'red-6'}
                  onClick={(e) => {
                    Modal.confirm({
                      title: '提示',
                      content: '确定拒绝该会话?',
                      onOk() {
                        cancelChatSessions(item.session_id).then().catch();
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
                            <span className={myStyles.time}>
                              {moment(i.time * 1000).format('YYYY-MM-DD HH:mm:ss')}
                            </span>
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
  }, [accept, reverseData]);
};
export default Index;
