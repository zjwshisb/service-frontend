// https://umijs.org/config/
import { defineConfig } from '@umijs/max';

const { REACT_APP_ENV = 'dev' } = process.env;

const PUBLIC_PATH: string = '/server';
export default defineConfig({
  define: {
    BASE_URL: 'http://127.0.0.1:8080/api/backend',
    WS_URL: 'http://127.0.0.1:8080/api/backend/ws',
  },
  publicPath: '/server',
});
