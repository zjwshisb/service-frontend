// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  define: {
    BASE_URL: 'http://localhost:9999/backend',
    WS_URL: 'ws://localhost:9999/backend/ws',
  },
  mfsu: { production: { output: '.mfsu-production' } },
});
