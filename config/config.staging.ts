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
  publicPath: '/admin/',
  outputPath: '../../wwwroot/default/admin/',
  define: {
    BASE_URL: 'http://119.29.196.153:9090/backend',
    WS_URL: 'ws://119.29.196.153:9090/backend/ws',
  },
});
