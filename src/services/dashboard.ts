import { request } from 'umi';

export async function getQueryInfo() {
  return request<API.Response>('/dashboard/query-info');
}
