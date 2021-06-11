import { request } from 'umi';

export async function getShortcutReplies() {
  return request<API.Response<API.ShortcutReply[]>>('/replies');
}
export async function storeShortcutReply(text: string) {
  return request<API.Response>('/replies', {
    method: 'POST',
    data: {
      content: text,
    },
  });
}
export async function destroyShortcutReply(id: React.ReactText) {
  return request<API.Response>(`/replies/${id}`, {
    method: 'DELETE',
  });
}
