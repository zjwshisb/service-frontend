import React from 'react';
import lodash from 'lodash';
import { useModel } from '@umijs/max';

export default function useRemoveUser() {
  const { setUsers } = useModel('chat.users');
  const { current, setCurrent } = useModel('chat.currentUser');
  return React.useCallback(
    (user: API.User) => {
      if (current && current.id === user.id) {
        setCurrent(undefined);
      } else {
        setUsers((prevState) => {
          const newState = lodash.cloneDeep(prevState);
          newState.delete(user.id);
          return newState;
        });
      }
    },
    [current, setCurrent, setUsers],
  );
}
