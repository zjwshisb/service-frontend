import React from 'react';
import { Menu, Modal } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import useRemoveUser from '@/hooks/useRemoveUser';

const Index: React.FC<{
  user: API.User;
}> = (props) => {
  const { setUser, setVisible } = useModel('useTransferModel');

  const handleRemove = useRemoveUser();

  const handleDelete = React.useCallback(
    (user: API.User) => {
      if (user.disabled) {
        handleRemove(user).then();
      } else {
        Modal.confirm({
          title: '提示',
          content: '确定断开与该用户的会话?',
          onOk() {
            handleRemove(user).then();
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
        default:
      }
    },
    [handleDelete, props.user, setUser, setVisible],
  );

  return (
    <Menu onClick={handleClick}>
      <Menu.Item key="remove">断开会话</Menu.Item>
      {!props.user.disabled && <Menu.Item key="transfer">转接其他客服</Menu.Item>}
    </Menu>
  );
};
export default Index;
