import {Reducer} from "redux";
import {Effect} from "dva";
import {CurrentUserType} from "@/components/typings";
import {queryUsers, queryCurrentUser} from "@/services/user";

export interface UserModelState {
  usersList: any[];  // TODO 完善 usersList 的功能, 包括获取和消费
  currentUser?: CurrentUserType;
}

interface UserModelType {
  namespace: string;
  state: UserModelState;
  effects: {
    fetchUsers: Effect;
    fetchCurrentUser: Effect;
  };
  reducers: {
    saveUsers: Reducer<UserModelState>;
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: "user",

  state: {
    usersList: [],
    currentUser: {
      username: "guest",
    },
  },

  effects: {
    * fetchUsers(_, {call, put}) {
      const response = yield call(queryUsers);
      yield put({type: "saveUsers", payload: {response}});
    },

    * fetchCurrentUser(_, {call, put}) {
      const response = yield call(queryCurrentUser);
      yield put({type: "saveCurrentUser", payload: response});
    },
  },

  reducers: {
    saveUsers(state, {payload}) {
      return {
        ...state!,
        list: payload,
      };
    },

    saveCurrentUser(state, {payload}) {
      return {
        ...state!,
        currentUser: payload || {},
      };
    },

    changeNotifyCount(state, {payload}) {
      return {
        ...state!,
        currentUser: {
          ...state!.currentUser!,
          unreadCount: payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
