import React from 'react';
import { Icon } from '@iconify/react';
import { useModel } from '@umijs/max';
const type = 'video';
const Video = () => {
  const { send } = useModel('chat.websocket');
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
