import React from 'react';
import { useLocalStorageState } from 'ahooks';

/**
 * 当前聊天对象
 */
export default function () {
  const [current, setCurrent] = useLocalStorageState<API.CurrentChatUser | undefined>('current');

  const [detailShow, setDetailShow] = React.useState(false);

  return {
    current,
    setCurrent,
    detailShow,
    setDetailShow,
  };
}
