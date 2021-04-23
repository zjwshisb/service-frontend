export function createReqId(minNum: number = 10000000000, maxNum: number = 99999999999): number {
  return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10);
}

export function createMsg(
  content: string,
  userId: number,
  type: APP.MessageType = 'text',
): APP.Action<APP.Message> {
  const id = createReqId();
  return {
    action: 'send-message',
    data: {
      type,
      user_id: userId,
      content,
      is_server: true,
      req_id: id,
      avatar: '',
      received_at: new Date().getTime() / 1000,
    },
    time: new Date().getTime(),
  };
}
