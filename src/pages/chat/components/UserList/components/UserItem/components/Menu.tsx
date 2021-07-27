import React from 'react';
import { Menu, Modal } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { removeUser } from '@/services';
import lodash from 'lodash';

const Index: React.FC<{
  user: API.User;
}> = (props) => {
  const { setUsers } = useModel('useUsersModel');

  const { current, setCurrent } = useModel('useCurrentModel');

  const handleDelete = React.useCallback(
    (user: API.User) => {
      const remove = (u: API.User) => {
        removeUser(u.id).then(() => {
          if (current && current.id === u.id) {
            setCurrent(undefined);
          } else {
            setUsers((prevState) => {
              const newState = lodash.cloneDeep(prevState);
              newState.delete(u.id);
              return newState;
            });
          }
        });
      };
      if (user.disabled) {
        remove(user);
      } else {
        Modal.confirm({
          title: '提示',
          content: '确定移除该用户?',
          onOk() {
            remove(user);
          },
        });
      }
    },
    [current, setCurrent, setUsers],
  );

  const handleClick = React.useCallback(
    (event) => {
      event.domEvent.stopPropagation();
      if (event.key === 'remove') {
        handleDelete(props.user);
      }
    },
    [handleDelete, props.user],
  );

  return (
    <Menu onClick={handleClick}>
      <Menu.Item key="remove">断开会话</Menu.Item>
    </Menu>
  );
};
export default Index;
