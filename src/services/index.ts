import { request } from 'umi';

export type LoginParamsType = {
  username: string;
  password: string;
};
export async function index(params: LoginParamsType) {
  return request<API.Response<{ token: string }>>('/login', {
    method: 'POST',
    data: params,
  });
}

export async function queryCurrent() {
  return request<API.Response<API.CurrentUser>>('/me');
}

export async function handleAccept(uid: number) {
  return request<API.Response<API.User>>('/ws/chat-user', {
    method: 'post',
    data: {
      uid,
    },
  });
}

export async function getUserInfo(uid: number) {
  return request<API.Response<Record<string, string>>>(`/ws/user/${uid}`);
}

export async function getUsers() {
  return request<API.Response<API.User[]>>('/ws/chat-users');
}

export async function removeUser(uid: number) {
  return request<API.Response>(`/ws/chat-user/${uid}`, {
    method: 'delete',
  });
}
export async function handleRead(uid: number) {
  return request<API.Response>('/ws/read-all', {
    method: 'post',
    data: {
      id: uid,
    },
  });
}
export async function getMessages(uid: number, mid?: number) {
  const query: Record<any, any> = {
    uid,
  };
  if (mid) {
    query.mid = mid;
  }
  return request<API.Response<API.Message[]>>('/ws/messages', {
    params: query,
  });
}
export async function getSettings() {
  return request<API.Response<API.Setting[]>>('/settings');
}
export async function updateSetting(name: string, value: string) {
  return request<API.Response>(`/settings/${name}`, {
    method: 'put',
    data: {
      value,
    },
  });
}
export async function getChatSessions(params: FORM.Pagination) {
  return request<API.Pagination<API.ChatSession>>('/chat-sessions', {
    params,
  });
}
export async function getChatSessionDetail(id: React.ReactText) {
  return request<
    API.Response<{
      messages: API.Message[];
      session: API.ChatSession;
      total: number;
    }>
  >(`/chat-sessions/${id}`);
}
