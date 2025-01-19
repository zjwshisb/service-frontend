import React from 'react';
import { Icon } from '@iconify/react';
import { useModel } from '@umijs/max';

const type: API.FileType[] = ['pdf'];

const Audio = () => {
  const { selectFile } = useModel('fileModel');

  const { send } = useModel('chat.websocket');

  const onClick = React.useCallback(() => {
    selectFile({
      type,
      count: 1,
    }).then((res) => {
      if (res[0]) {
        send(res[0].url, res[0].type as API.MessageType);
      }
    });
  }, [selectFile, send]);

  return <Icon onClick={onClick} icon={'line-md:file'} className={'cursor-pointer'} />;
};
export default Audio;
