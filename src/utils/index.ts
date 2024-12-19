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
