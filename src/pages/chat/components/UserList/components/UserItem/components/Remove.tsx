import React from 'react';
import { DeleteOutlined } from '@ant-design/icons/lib';
import { removeUser } from '@/services';
import lodash from 'lodash';
import { Modal } from 'antd';
import { useModel } from '@@/plugin-model/useModel';

const Index: React.FC<{
  user: APP.User;
}> = (props) => {
  const { setUsers } = useModel('useUsersModel');

  const { current, setCurrent } = useModel('useCurrentModel');

  const handleDelete = React.useCallback(
    (user: APP.User) => {
      const remove = (u: APP.User) => {
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

  return (
    <>
      <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(props.user)} />
    </>
  );
};
export default Index;
