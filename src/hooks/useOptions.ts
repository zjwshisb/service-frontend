import { useRequest } from '@umijs/max';
import { getOptions } from '@/services';

type OptionType = 'auto-messages';

export function useOptions(type: OptionType) {
  const { data = [] } = useRequest(() => {
    return getOptions(type);
  });
  return data;
}
