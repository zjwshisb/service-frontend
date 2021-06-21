import React from 'react';

/**
 * 当前聊天对象
 */
export default function useCurrentModel() {
  const [current, setCurrent] = React.useState<APP.User | undefined>();

  const [top, setTop] = React.useState(0);

  // 消息列表滚动到最底部
  const goTop = React.useCallback(() => {
    setTop((prevState) => prevState + 1);
  }, []);

  return {
    current,
    setCurrent,
    goTop,
    top,
  };
}
