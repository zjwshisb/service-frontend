import { getReqId } from '@/services';
import dayjs from 'dayjs';
export async function createMsg(
  content: string,
  userId: number,
  type: API.MessageType = 'text',
): Promise<API.SendMessageAction> {
  const res = await getReqId();
  return {
    action: 'send-message',
    data: {
      type,
      user_id: userId,
      content,
      source: 1,
      req_id: res.data.req_id,
      avatar: '',
      received_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      is_read: false,
    },
    time: new Date().getTime(),
  };
}

export function getMessageTypeLabel(content: string, type: API.MessageType): string {
  switch (type) {
    case 'text': {
      return content;
    }
    case 'audio':
      return '[音频]';
    case 'image':
      return '[图片]';
    case 'video':
      return '[视频]';
    case 'pdf':
      return '[PDF]';
    case 'navigator': {
      return '[导航卡片]';
    }
    default: {
      return '';
    }
  }
}
