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
  return request<API.Response<APP.User>>('/ws/chat-user', {
    method: 'post',
    data: {
      uid,
    },
  });
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
