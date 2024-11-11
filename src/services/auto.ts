import { request } from '@umijs/max';

export async function fetchAutoMessage(id: React.ReactText) {
  return request<API.Response<API.AutoMessage>>(`/auto-messages/${id}`);
}

export async function getAutoMessage(params: FORM.Pagination) {
  return request<API.Pagination<API.AutoMessage>>('/auto-messages', {
    params,
  });
}
export async function storeAutoMessage(data: FORM.AutoMessageForm) {
  return request<API.Response>('/auto-messages', {
    method: 'POST',
    data,
  });
}
export async function updateAutoMessage(data: FORM.AutoMessageForm, id: React.ReactText) {
  return request<API.Response>(`/auto-messages/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteAutoMessage(id: React.ReactText) {
  return request<API.Response>(`/auto-messages/${id}`, {
    method: 'Delete',
  });
}

export async function getAutoRuleMessages() {
  return request<API.Response<API.Option[]>>('/options/messages');
}
export async function getAutoRuleScenes() {
  return request<API.Response<API.Option[]>>('/options/scenes');
}
export async function getAutoRuleEvents() {
  return request<API.Response<API.Option[]>>('/options/events');
}
export async function getAutoRules(params: FORM.Pagination) {
  return request<API.Pagination<API.AutoRule>>('/auto-rules', {
    params,
  });
}
export async function storeAutoRule(data: FORM.AutoRuleForm) {
  return request<API.Response<API.AutoRule>>('/auto-rules', {
    method: 'POST',
    data,
  });
}
export async function deleteAutoRule(id: React.ReactText) {
  return request<API.Response>(`/auto-rules/${id}`, {
    method: 'delete',
  });
}
export async function showAutoRule(id: string) {
  return request<API.Response<API.AutoRule>>(`/auto-rules/${id}`);
}
export async function updateAutoRule(data: FORM.AutoRuleForm, id: string) {
  return request<API.Response>(`/auto-rules/${id}`, {
    method: 'PUT',
    data,
  });
}
export async function getSystemAutoRule() {
  return request<API.Response<API.AutoRule[]>>('/system-auto-rules');
}
export async function updateSystemAutoRule(data: Record<string, number>) {
  return request<API.Response>('/system-auto-rules', {
    method: 'PUT',
    data,
  });
}
