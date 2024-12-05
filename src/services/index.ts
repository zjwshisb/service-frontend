import type React from 'react';
import { request } from '@umijs/max';

export * from './admin';
export * from './file';

export async function getOptions(type: API.OptionType) {
  return request<API.Response<API.Option[]>>(`/options/${type}`, {
    method: 'get',
  });
}

export async function login(params: FORM.LoginForm) {
  return request<API.Response<{ token: string }>>('/login', {
    method: 'POST',
    data: params,
  });
}

export async function queryCurrentUser() {
  return request<API.Response<API.CurrentUser>>('/current-admin/info');
}

export async function getChatSetting() {
  return request<API.Response<API.AdminChatSetting>>('/current-admin/settings');
}

export async function updateChatSetting(data: API.AdminChatSetting) {
  return request<API.Response>('/current-admin/settings', {
    data,
    method: 'PUT',
  });
}

export async function handleCancelTransfer(id: React.ReactText) {
  return request<API.Response>(`/ws/transfer/${id}/cancel`, {
    method: 'POST',
  });
}

export async function handleAccept(sid: number) {
  return request<API.Response<API.User>>('/ws/chat-user', {
    method: 'post',
    data: {
      sid,
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
  return request<API.Response<Record<string, string>>>(`/ws/chat-user/${uid}`);
}

export async function getUsers() {
  return request<API.Response<API.User[]>>('/ws/chat-users');
}

export async function removeUser(uid: number) {
  return request<API.Response>(`/ws/chat-user/${uid}`, {
    method: 'delete',
  });
}

export async function handleRead(uid: number, msgId?: number) {
  return request<API.Response>('/ws/read', {
    method: 'post',
    data: {
      id: uid,
      msg_id: msgId,
    },
  });
}

export async function getReqId() {
  return request<
    API.Response<{
      req_id: string;
    }>
  >('/ws/req-id', {
    method: 'get',
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

export async function getSettings(params: FORM.Pagination) {
  return request<API.Response<API.Setting[]>>('/settings', {
    params,
  });
}

export async function updateSetting(name: number, value: string) {
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

export async function cancelChatSessions(id: React.Key) {
  return request<API.Response>(`/chat-sessions/${id}/cancel`, {
    method: 'POST',
  });
}

export async function getChatSessionDetail(id: React.Key) {
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

export async function cancelTransfer(id: React.Key) {
  return request<API.Pagination<API.Transfer>>(`/transfers/${id}/cancel`, {
    method: 'post',
  });
}
