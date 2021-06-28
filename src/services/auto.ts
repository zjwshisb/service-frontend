import { request } from 'umi';

export async function getRuleMessages() {
  return request<API.Pagination>('/rule-messages');
}

export async function fetchAutoMessage(id: React.ReactText) {
  return request<API.Response<API.AutoMessage>>(`/auto-message/${id}`);
}

export async function getAutoMessage(params: FORM.Pagination) {
  return request<API.Pagination<API.AutoMessage>>('/auto-messages', {
    params,
  });
}
export async function storeAutoMessage(data: FORM.AutoMessageForm) {
  return request<API.Response>('/auto-message', {
    method: 'POST',
    data,
  });
}
export async function updateAutoMessage(data: FORM.AutoMessageForm, id: React.ReactText) {
  return request<API.Response>(`/auto-message/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteAutoMessage(id: React.ReactText) {
  return request<API.Response>(`/auto-message/${id}`, {
    method: 'Delete',
  });
}

export async function getAutoRuleMessages() {
  return request<API.Response<API.Option[]>>('/auto-rules/options/messages');
}

export async function getAutoRules(params: FORM.Pagination) {
  return request<API.Pagination<API.AutoRule>>('/auto-rules', {
    params,
  });
}
export async function storeAutoRule(data: FORM.AutoRuleForm) {
  return request<API.Response<API.AutoRule>>('/auto-rule', {
    method: 'POST',
    data,
  });
}
export async function showAutoRule(id: string) {
  return request<API.Response<API.AutoRule>>(`/auto-rule/${id}`);
}
export async function updateAutoRule(data: FORM.AutoRuleForm, id: string) {
  return request<API.Response>(`/auto-rule/${id}`, {
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
