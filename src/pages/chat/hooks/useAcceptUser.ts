import React from 'react';
import { handleAccept } from '@/services';
import { useSnapshot } from '@umijs/max';
import { App } from 'antd';
import currentUser from '@/pages/chat/store/currentUser';
import users from '@/pages/chat/store/users';

export default function useAccept() {
  const { addUser } = useSnapshot(users);
  const { current, setCurrent } = useSnapshot(currentUser);

  const { message } = App.useApp();

  return React.useCallback(
    (id: number) => {
      handleAccept(id).then((res) => {
        if (res.data.id === current?.id) {
          setCurrent(undefined);
        } else {
          addUser(res.data);
        }
        message.success('接入成功').then();
      });
    },
    [current?.id, message, setCurrent, addUser],
  );
}
