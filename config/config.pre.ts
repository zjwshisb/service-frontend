// https://umijs.org/config/
import { defineConfig } from '@umijs/max';

export default defineConfig({
  define: {
    BASE_URL: 'http://120.77.242.145:8080/api/backend',
    WS_URL: 'http://120.77.242.145:8080/api/backend/ws',
  },
  publicPath: '/server/',
});
