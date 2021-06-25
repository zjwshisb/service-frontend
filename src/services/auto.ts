import { request } from 'umi';

export async function getRuleMessages() {
  return request<API.Pagination>('/rule-messages');
}

export async function fetchAutoMessage(id: React.ReactText) {
  return request<API.Response<API.AutoMessage>>(`/auto-message/${id}`);
}

export async function getAutoMessage(params: FORM.Pagination) {
  return request<API.Pagination<API.AutoMessage>>('/auto-messages', {
    params,
  });
}
export async function storeAutoMessage(data: FORM.AutoMessageForm) {
  return request<API.Response>('/auto-message', {
    method: 'POST',
    data,
  });
}
export async function updateAutoMessage(data: FORM.AutoMessageForm, id: React.ReactText) {
  return request<API.Response>(`/auto-message/${id}`, {
    method: 'PUT',
    data,
  });
}
export async function deleteAutoMessage(id: React.ReactText) {
  return request<API.Response>(`/auto-message/${id}`, {
    method: 'Delete',
  });
}
