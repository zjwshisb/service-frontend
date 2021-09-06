import type React from 'react';
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
export async function getChatSetting() {
  return request<API.Response<API.AdminChatSetting>>('/me/settings');
}
export async function updateChatSetting(data: API.AdminChatSetting) {
  return request<API.Response>('/me/settings', {
    data,
    method: 'PUT',
  });
}
export async function handleCancelTransfer(id: React.ReactText) {
  return request<API.Response>(`/ws/transfer/${id}/cancel`, {
    method: 'POST',
  });
}
export async function handleAccept(uid: number) {
  return request<API.Response<API.User>>('/ws/chat-user', {
    method: 'post',
    data: {
      uid,
    },
  });
}
export async function handleTransfer(uid: number, toId: number, remark = '') {
  return request<API.Response>('/ws/transfer', {
    method: 'POST',
    data: {
      remark,
      user_id: uid,
      to_id: toId,
    },
  });
}
export async function getTransferMessage(id: number) {
  return request<API.Response<API.Message[]>>(`/ws/transfer/${id}/messages`);
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
export async function getHistorySessions(uid: number) {
  return request<API.Response<API.ChatSession[]>>(`/ws/sessions/${uid}`);
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
export async function getTransfers() {
  return request<API.Pagination<API.Transfer>>(`/transfers`);
}
export async function cancelTransfer(id: React.ReactText) {
  return request<API.Pagination<API.Transfer>>(`/transfers/${id}/cancel`, {
    method: 'post',
  });
}
export async function getAdmins() {
  return request<API.Pagination<API.Admin>>(`/admins`);
}
export async function getAdminDetail(id: React.ReactText, params: Record<any, any>) {
  return request<API.Response>(`/admins/${id}`, {
    params,
  });
}
