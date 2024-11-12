import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';
import { getToken } from '@/utils/auth';
import { history } from '@umijs/max';
// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  code?: number;
  message?: string;
  showType?: ErrorShowType;
}

const codeMessage: Record<any, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { success, data, code, message, showType } = res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(message);
        error.name = 'BizError';
        error.info = { code, message, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { code, message: msg } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(msg).then();
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(msg).then();
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: msg,
                message: code,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(msg).then();
          }
        }
      } else if (error.response) {
        const { response } = error;
        const { data } = response;
        if (response && response.status) {
          const errorText = codeMessage[response.status] || data;
          const { status, url } = response;
          switch (status) {
            case 401: {
              history.replace('/user/login');
              break;
            }
            case 404: {
              message.error('数据不见啦').then();
              break;
            }
            case 422: {
              message.error(data.message).then();
              break;
            }
            case 500:
            default: {
              notification.error({
                message: `请求错误 ${status}: ${url}`,
                description: errorText,
              });
              break;
            }
          }
        }
        throw error;
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.').then();
      } else {
        console.log('test');
        // 发送请求时出了点问题
        message.error('Request error, please retry.').then();
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      const token = getToken();
      config.baseURL = BASE_URL;
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['Accept'] = 'application/json';
      if (token) {
        config.headers['Authorization'] = `bearer ${getToken()}`;
      }
      return { ...config };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      if (data?.success === false) {
        // message.error('请求失败！');
      }
      return response;
    },
  ],
};
