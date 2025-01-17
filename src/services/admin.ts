import { request } from '@@/exports';

export async function getAdmins(params: FORM.Pagination) {
  return request<API.Pagination<API.Admin>>(`/admins`, {
    params,
  });
}

export async function storeAdmin(data: FORM.AdminForm) {
  return request<API.Response>(`/admins`, {
    method: 'POST',
    data,
  });
}
