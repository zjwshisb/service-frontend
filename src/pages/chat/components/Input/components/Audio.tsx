import React from 'react';
import { Icon } from '@iconify/react';
import { useModel, useSnapshot } from '@umijs/max';
import websocket from '@/pages/chat/store/websocket';

const type = 'audio';

const Audio = () => {
  const { selectFile } = useModel('fileModel');

  const { send } = useSnapshot(websocket);

  const onClick = React.useCallback(() => {
    selectFile({
      type,
      count: 1,
    }).then((res) => {
      if (res[0]) {
        send(res[0].url, type);
      }
    });
  }, [selectFile, send]);

  return <Icon onClick={onClick} icon={'ant-design:audio-outlined'} className={'cursor-pointer'} />;
};
export default Audio;
