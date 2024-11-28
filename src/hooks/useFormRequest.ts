import React from 'react';
import { extraData } from '@/utils';

export function useFormRequest<T>(
  request: (id: React.Key) => Promise<API.Response<T>>,
  id?: React.Key,
) {
  if (!id) {
    return undefined;
  }
  return () => extraData(request(id));
}
