import { request } from 'umi';

export type LoginParamsType = {
  username: string;
  password: string;
};

export async function login(params: LoginParamsType) {
  return request<API.Response<{token: string}>>('/service/login', {
    method: 'POST',
    data: params,
  });
}


export async function outLogin() {
  return request('/api/login/outLogin');
}
