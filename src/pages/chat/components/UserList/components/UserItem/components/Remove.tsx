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

  const handleDelete = React.useCallback(
    (user: APP.User) => {
      if (user.disabled) {
        removeUser(user.id).then(() => {
          setUsers((prevState) => {
            const newState = lodash.cloneDeep(prevState);
            newState.delete(user.id);
            return newState;
          });
        });
      } else {
        Modal.confirm({
          title: '提示',
          content: '确定移除该用户?',
          onOk() {
            removeUser(user.id).then(() => {
              setUsers((prevState) => {
                const newState = lodash.cloneDeep(prevState);
                newState.delete(user.id);
                return newState;
              });
            });
          },
        });
      }
    },
    [setUsers],
  );

  return (
    <>
      <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(props.user)} />
    </>
  );
};
export default Index;
