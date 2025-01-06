// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
const PUBLIC_PATH = '/server/';
export default defineConfig({
  define: {
    BASE_URL: 'http://120.77.242.145:8080/api/backend',
    WS_URL: 'http://120.77.242.145:8080/api/backend/ws',
  },
  publicPath: PUBLIC_PATH,
  base: PUBLIC_PATH,
  /**
   * @name <head> 中额外的 script
   * @description 配置 <head> 中额外的 script
   */
  headScripts: [
    // 解决首次加载时白屏的问题
    {
      src: join(PUBLIC_PATH, 'scripts/loading.js'),
      async: true,
    },
  ],
});
