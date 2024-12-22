import React from 'react';
import { handleAccept } from '@/services';
import { useModel } from '@umijs/max';
import { App } from 'antd';

export default function useAccept() {
  const { addUser } = useModel('chat.users');
  const { current, setCurrent } = useModel('chat.currentUser');

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
