import React, {createContext} from 'react';
import {WrappedFormUtils} from 'antd/es/form/Form';

export interface TabUtilType {
  addTab: (id: string) => void;
  removeTab: (id: string) => void;
}

export type UpdateActiveFunc = (activeItemFieldId: string) => void;

export interface LoginContextType {
  tabUtil?: TabUtilType;
  form?: WrappedFormUtils;
  updateActive?: UpdateActiveFunc;
}

const LoginContext: React.Context<LoginContextType> = createContext({});
export default LoginContext;
