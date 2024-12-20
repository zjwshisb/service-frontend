import { request } from '@umijs/max';

export async function getOnlineInfo() {
  return request<API.Response<API.Dashboard.OnlineInfo>>('/dashboard/online-info');
}

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

export async function getWaitingUsers() {
  return request<API.Response<API.Dashboard.SimpleUser[]>>('/dashboard/waiting-users');
}
