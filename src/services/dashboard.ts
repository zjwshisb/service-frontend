import { request } from '@umijs/max';

export async function getOnlineUserInfo() {
  return request<
    API.Response<{
      users: API.Dashboard.SimpleUser[];
      active_count: number;
    }>
  >('/dashboard/online-user-info');
}

export async function getAdminInfo() {
  return request<
    API.Response<{
      admins: API.Dashboard.SimpleUser[];
      total: number;
    }>
  >('/dashboard/admin-info');
}

export async function getWaitingUserInfo() {
  return request<
    API.Response<{
      users: API.Dashboard.SimpleUser[];
      today_total: number;
    }>
  >('/dashboard/waiting-user-info');
}
