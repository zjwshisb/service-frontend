import { request } from '@umijs/max';

export async function getQueryInfo() {
  return request<API.Response<API.Dashboard.QueryInfo>>('/dashboard/query-info');
}
export async function getOnlineInfo() {
  return request<API.Response<API.Dashboard.OnlineInfo>>('/dashboard/online-info');
}
