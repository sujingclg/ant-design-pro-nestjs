import {AnyAction} from "redux";
import {EffectsCommandMap} from "dva";
import {RouterTypes} from "umi";
import {MenuDataItemType} from "@/components/typings";
import {GlobalModelState} from "./global";
import {LoginModelState} from "./login";
import {MenuModelState} from "./menu";
import {SettingModelState} from "./setting";
import {UserModelState} from "./user";

export {UserModelState};

interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    login?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  login: LoginModelState;
  menu: MenuModelState;
  setting: SettingModelState;
  user: UserModelState;
  loading: Loading;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Route extends MenuDataItemType {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch;
}
