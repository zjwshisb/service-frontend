import { request } from '@@/exports';
import type React from 'react';

export async function getAdmins(params: FORM.Pagination) {
  return request<API.Pagination<API.Admin>>(`/admins`, {
    params,
  });
}
export async function getAdminDetail(id: React.ReactText, params: Record<any, any>) {
  return request<API.Response>(`/admins/${id}`, {
    params,
  });
}
