import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  title: '客服系统',
  pwa: false,
  iconfontUrl: undefined,
  menu: {
    locale: false,
  },
  headerHeight: 48,
};

export default Settings;
