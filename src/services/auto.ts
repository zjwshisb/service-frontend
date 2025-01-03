import { request } from '@umijs/max';
import React from 'react';

export async function getAutoMessageForm(id: React.Key) {
  return request<API.Response<FORM.AutoMessageForm>>(`/auto-messages/${id}/form`);
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
export async function updateAutoMessage(data: FORM.AutoMessageForm, id: React.Key) {
  return request<API.Response>(`/auto-messages/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteAutoMessage(id: React.Key) {
  return request<API.Response>(`/auto-messages/${id}`, {
    method: 'Delete',
  });
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
export async function deleteAutoRule(id: React.Key) {
  return request<API.Response>(`/auto-rules/${id}`, {
    method: 'delete',
  });
}
export async function getAutoRuleForm(id: React.Key) {
  return request<API.Response<FORM.AutoRuleForm>>(`/auto-rules/${id}/form`);
}
export async function updateAutoRule(data: FORM.AutoRuleForm, id: React.Key) {
  return request<API.Response>(`/auto-rules/${id}`, {
    method: 'PUT',
    data,
  });
}
export async function getSystemAutoRule() {
  return request<API.Response<API.SystemRule[]>>('/system-auto-rules');
}
export async function updateSystemAutoRule(data: Record<string, number>) {
  return request<API.Response>('/system-auto-rules', {
    method: 'PUT',
    data: {
      data,
    },
  });
}
