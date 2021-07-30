import React from 'react';
import { handleAccept } from '@/services';
import lodash from 'lodash';
import { useModel } from '@@/plugin-model/useModel';
import { createMsg } from '@/utils';
import { message, Modal } from 'antd';

export default function useAccept() {
  const { setUsers } = useModel('useUsersModel');
  const { send } = useModel('useWebsocketModel');
  const { current, setCurrent, goTop } = useModel('useCurrentModel');
  const { setting } = useModel('useSettingModel');
  return React.useCallback(
    (id: number) => {
      handleAccept(id)
        .then((res) => {
          if (res.data.id === current?.id) {
            goTop();
            setCurrent(res.data);
          } else {
            setUsers((prevState) => {
              const newState = lodash.clone(prevState);
              newState.set(res.data.id, res.data);
              return newState;
            });
            if (setting?.welcome_content) {
              send(createMsg(setting?.welcome_content, res.data.id));
            }
          }
          message.success('接入成功');
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
    [current?.id, goTop, setCurrent, setUsers, setting?.welcome_content, send],
  );
}
