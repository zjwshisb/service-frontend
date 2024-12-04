import React from 'react';
import { PictureOutlined } from '@ant-design/icons/lib';
// import { createMsg } from '@/utils';
// import { useModel } from '@umijs/max';

const Index = () => {
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

  return (
    <div>
      <PictureOutlined className={'action-icon'} />
    </div>
  );
};
export default Index;
