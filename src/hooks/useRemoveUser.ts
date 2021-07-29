import React from 'react';
import { removeUser } from '@/services';
import lodash from 'lodash';
import { useModel } from '@@/plugin-model/useModel';

export default function useRemoveUser() {
  const { setUsers } = useModel('useUsersModel');
  const { current, setCurrent } = useModel('useCurrentModel');
  return React.useCallback(
    (user: API.User) => {
      return removeUser(user.id).then(() => {
        if (current && current.id === user.id) {
          setCurrent(undefined);
        } else {
          setUsers((prevState) => {
            const newState = lodash.cloneDeep(prevState);
            newState.delete(user.id);
            return newState;
          });
        }
      });
    },
    [current, setCurrent, setUsers],
  );
}
