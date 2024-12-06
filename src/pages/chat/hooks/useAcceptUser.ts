import React from 'react';
import { handleAccept, handleRead } from '@/services';
import { useModel } from '@umijs/max';
import { App, Modal } from 'antd';

export default function useAccept() {
  const { addUser } = useModel('chat.users');
  const { send } = useModel('chat.websocket');
  const { current, setCurrent, goTop } = useModel('chat.currentUser');
  const { setting } = useModel('chat.adminSetting');

  const { message } = App.useApp();

  return React.useCallback(
    (id: number) => {
      handleAccept(id)
        .then((res) => {
          if (res.data.id === current?.id) {
            goTop();
            setCurrent(res.data);
            handleRead(res.data.id, res.data.messages[0]?.id).then().catch();
          } else {
            addUser(res.data);
            if (setting?.welcome_content) {
              send(setting?.welcome_content, 'text');
            }
          }
          message.success('接入成功').then();
        })
        .catch((err) => {
          if (err.data.success === false) {
            Modal.error({
              title: '提示',
              content: err.data.message,
            });
          }
        });
    },
    [current?.id, message, goTop, setCurrent, addUser, setting?.welcome_content, send],
  );
}
