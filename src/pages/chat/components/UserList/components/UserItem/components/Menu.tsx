import React from 'react';
import { Menu, Modal } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import useRemoveUser from '@/hooks/useRemoveUser';
import { removeUser } from '@/services';
import HistorySession from './HistorySession';

const Index: React.FC<{
  user: API.User;
}> = (props) => {
  const { setUser, setVisible } = useModel('useTransferModel');

  const show = useModel('useHistorySessionModal', (model) => model.show);

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

  const handleClick = React.useCallback(
    (event) => {
      event.domEvent.stopPropagation();
      switch (event.key) {
        case 'remove':
          handleDelete(props.user);
          break;
        case 'transfer':
          setUser(props.user);
          setVisible(true);
          break;
        case 'other-session':
          show(props.user.id);
          break;
        default:
      }
    },
    [handleDelete, props.user, setUser, setVisible, show],
  );

  return (
    <>
      <HistorySession />
      <Menu onClick={handleClick}>
        <Menu.Item key="remove">断开会话</Menu.Item>
        {!props.user.disabled && <Menu.Item key="transfer">转接其他客服</Menu.Item>}
        <Menu.Item key="other-session">历史对话</Menu.Item>
      </Menu>
    </>
  );
};
export default Index;
