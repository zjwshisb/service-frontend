import dayjs from 'dayjs';
import lodash from 'lodash';

export async function extraData<T>(
  fn: (() => Promise<API.Response<T>>) | Promise<API.Response<T>>,
) {
  if (lodash.isFunction(fn)) {
    const res = await fn();
    return res.data;
  } else {
    return (await fn).data;
  }
}

export function timeFormat(datetime: string) {
  const today = dayjs();
  const pre = dayjs(datetime);
  if (pre.year() === today.year() && pre.month() === today.month() && today.date() === pre.date()) {
    return pre.format('HH:mm:ss');
  }
  return pre.format('YYYY-MM-DD');
}
