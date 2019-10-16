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
  title: 'ant-design-pro-nestjs',
};

export default defaultSettings;
