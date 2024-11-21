import { useRequest } from '@umijs/max';
import { getOptions } from '@/services';

export function useOptions(type: API.OptionType) {
  const { data } = useRequest(() => {
    return getOptions(type);
  });
  return data;
}
