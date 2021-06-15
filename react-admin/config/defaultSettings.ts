import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',
  // 拂晓蓝
  // primaryColor: '#1890ff',
  // element蓝
  primaryColor: '#409EFF',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '花小易活动管理',
  pwa: false,
  iconfontUrl: '',
  // headerRender: false
};

export type { DefaultSettings };

export default proSettings;
