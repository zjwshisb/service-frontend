import React from 'react';

/**
 * 当前聊天对象
 */
export default function useCurrentModel() {
  const [current, setCurrent] = React.useState<APP.User | undefined>();

  return {
    current,
    setCurrent,
  };
}
