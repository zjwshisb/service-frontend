import { request } from 'umi';

export async function getRuleMessages() {
  return request<API.Pagination>('/rule-messages');
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
