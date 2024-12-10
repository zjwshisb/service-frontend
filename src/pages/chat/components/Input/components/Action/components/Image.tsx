import React from 'react';
import { PictureOutlined } from '@ant-design/icons/lib';
import { useModel } from '@umijs/max';

const type = 'image';

const Image = () => {
  const { selectFile } = useModel('fileModel');

  const { send } = useModel('chat.websocket');

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

  return <PictureOutlined onClick={onClick} className={'action-icon cursor-pointer'} />;
};
export default Image;
