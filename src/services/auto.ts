import { request } from 'umi';

export async function getRuleMessages() {
  return request<API.Pagination>('/rule-messages');
}
