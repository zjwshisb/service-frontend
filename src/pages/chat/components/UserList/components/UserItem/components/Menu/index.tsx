import React from 'react';
import { Modal, Space } from 'antd';
import { useModel } from '@umijs/max';
import useRemoveUser from '@/pages/chat/hooks/useRemoveUser';
import { removeUser } from '@/services';
import HistorySession from '../HistorySession';
import { MessageOutlined, CloseOutlined, SwapOutlined } from '@ant-design/icons';

const Index: React.FC<{
  user: API.User;
}> = (props) => {
  const { setUser, setVisible } = useModel('chat.transfer');

  const show = useModel('chat.historySession', (model) => model.show);

  const handleRemove = useRemoveUser();

  const handleDelete = React.useCallback(
    (user: API.User) => {
      if (user.disabled) {
        removeUser(user.id).then(() => {
          handleRemove(user);
        });
      } else {
        Modal.confirm({
          title: '提示',
          content: '确定断开与该用户的会话?',
          onOk() {
            removeUser(user.id).then(() => {
              handleRemove(user);
            });
          },
        });
      }
    },
    [handleRemove],
  );

  return (
    <>
      <HistorySession />
      <div className={'w-full text-right'}>
        <Space>
          <MessageOutlined
            onClick={(e) => {
              show(props.user.id);
              e.stopPropagation();
            }}
          />
          {!props.user.disabled && (
            <SwapOutlined
              onClick={(e) => {
                setUser(props.user);
                setVisible(true);
                e.stopPropagation();
              }}
            />
          )}
          <CloseOutlined
            onClick={(e) => {
              handleDelete(props.user);
              e.stopPropagation();
            }}
          />
        </Space>
      </div>
    </>
  );
};
export default Index;
