export interface Settings {
  contentWidth: 'Fluid' | 'Fixed';
  menu: {
    locale: boolean;
  };
  title: string;
}

const defaultSettings: Settings = {
  contentWidth: 'Fluid',
  menu: {
    locale: true,
  },
  title: 'antd-nestjs',
};

export default defaultSettings;
