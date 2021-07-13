import React from 'react';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification, Modal } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { ResponseError } from 'umi-request';
import { queryCurrent } from '@/services';
import defaultSettings from '../config/defaultSettings';
import { getToken } from '@/utils/auth';

/**
 * 获取用户信息比较慢的时候会展示一个 loading
 */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const token = getToken();
      if (token) {
        const res = await queryCurrent();
        return res.data;
      }
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  const currentUser = await fetchUserInfo();
  if (!currentUser) {
    history.push('/chat');
  }
  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

const codeMessage = {
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
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response, data } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    switch (response.status) {
      case 401: {
        break;
      }
      case 404: {
        Modal.error({
          title: '提示',
          content: '数据不见啦',
        });
        break;
      }
      case 422: {
        Modal.error({
          title: '提示',
          content: data.message,
        });
        break;
      }

      case 500: {
        break;
      }
      default: {
        notification.error({
          message: `请求错误 ${status}: ${url}`,
          description: errorText,
        });
      }
    }
  }
  throw error;
};

export const request: RequestConfig = {
  errorHandler,
  prefix: BASE_URL,
  requestInterceptors: [
    (url, options) => {
      const token = getToken();
      if (token) {
        const headers = {
          Accept: 'application/json',
          Authorization: `bearer ${getToken()}`,
          ...options.headers,
        };
        return {
          url,
          options: {
            ...options,
            headers,
          },
        };
      }
      return {
        url,
        options,
      };
    },
  ],
};
