export interface Settings {
  CSSLayoutType: 'Fluid' | 'Fixed';
  menu: {
    locale: boolean;
  };
  title: string;
}

const defaultSettings: Settings = {
  CSSLayoutType: 'Fluid',
  menu: {
    locale: true,
  },
  title: 'antd-nestjs',
};

export default defaultSettings;
