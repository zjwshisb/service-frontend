import { request } from '@@/exports';
import React from 'react';

export async function getFiles(params?: {
  type?: API.FileType;
  last_id?: number;
  dir_id?: number;
}) {
  return request<API.Pagination<API.File>>(`/files`, {
    method: 'get',
    params,
  });
}

export async function storeDir(data: { pid: number; name: string }) {
  return request<API.Response>('/file-dirs', {
    data,
    method: 'post',
  });
}

export async function deleteFile(id: React.Key) {
  return request<API.Response>(`/files/${id}`, {
    method: 'delete',
  });
}

export async function updateFile(id: React.Key, name: string) {
  return request<API.Response>(`/files/${id}`, {
    method: 'put',
    data: {
      name,
    },
  });
}
