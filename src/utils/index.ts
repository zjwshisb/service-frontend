import moment from 'moment';
import { getReqId } from '@/services';

export function createReqId(minNum: number = 10000000000, maxNum: number = 99999999999): number {
  return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10);
}
export function timeFormat(timestamp: number) {
  const today = moment();
  const pre = moment(timestamp * 1000);
  if (pre.year() === today.year() && pre.month() === today.month() && today.date() === pre.date()) {
    return pre.format('HH:mm:ss');
  }
  return pre.format('YYYY-MM-DD');
}
export async function createMsg(
  content: string,
  userId: number,
  type: API.MessageType = 'text',
): Promise<API.Action<API.Message>> {
  const res = await getReqId();
  return {
    action: 'send-message',
    data: {
      type,
      user_id: userId,
      content,
      source: 1,
      req_id: res.data.reqId,
      avatar: '',
      received_at: new Date().getTime() / 1000,
    },
    time: new Date().getTime(),
  };
}
