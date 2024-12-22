import { useGetState } from 'ahooks';

/**
 * 当前聊天对象
 */
export default function () {
  const [current, setCurrent, getCurrent] = useGetState<API.CurrentChatUser | undefined>();

  return {
    current,
    setCurrent,
    getCurrent,
  };
}
