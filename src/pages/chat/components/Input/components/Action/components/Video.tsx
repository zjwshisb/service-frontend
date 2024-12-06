import React from 'react';
import { Icon } from '@iconify/react';
// import { createMsg } from '@/utils';
// import { useModel } from '@umijs/max';

const Video = () => {
  // const { current } = useModel('chat.currentUser');
  // const { send } = useModel('chat.websocket');
  //
  // const onChange = React.useCallback(
  //   (url: string) => {
  //     if (current) {
  //       if (url !== '') {
  //         createMsg(url, current.id, 'file').then((msg) => {
  //           send(msg);
  //         });
  //       }
  //     }
  //   },
  //   [current, send],
  // );

  return <Icon icon={'tabler:video'} className={'cursor-pointer'} />;
};
export default Video;
