import { request } from 'umi';

export async function queryCurrent() {
  return request<API.CurrentUser>('/service/me');
}
