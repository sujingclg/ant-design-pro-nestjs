export interface SettingModelState {}

interface SettingModelType {
  namespace: "setting";
  state: SettingModelState;
}

const SettingModel: SettingModelType = {
  namespace: "setting",

  state: {},
};

export default SettingModel;
