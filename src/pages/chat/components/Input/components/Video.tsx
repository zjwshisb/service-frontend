import React from 'react';
import { Icon } from '@iconify/react';
import { useModel, useSnapshot } from '@umijs/max';
import websocket from '@/pages/chat/store/websocket';
const type = 'video';
const Video = () => {
  const { send } = useSnapshot(websocket);
  const { selectFile } = useModel('fileModel');
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

  return <Icon icon={'tabler:video'} onClick={onClick} className={'cursor-pointer'} />;
};
export default Video;
