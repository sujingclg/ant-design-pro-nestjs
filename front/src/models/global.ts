import {Reducer} from "redux";
import {NoticeItem} from "@/components/NoticeIcon/typings";
import {Effect} from "./connect";
import {queryNotices} from "@/services/api";


const delay = (millisecond: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, millisecond)
  })
};

export interface GlobalModelState {
  collapsed: boolean;
  notices: NoticeItem[];
}

interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchNotices: Effect;
    changeNoticeReadState: Effect;
    clearNotices: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveNotices: Reducer<GlobalModelState>;
    saveClearedNotices: Reducer<GlobalModelState>;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    * fetchNotices(_, {call, put, select}) {  // sagaEffects 中的 select 方法用于获取当前时刻的全局 state 对象
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount = yield select(state => (
        state.global.notices.filter(item => !item.isRead).length
      ));
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          unreadCount,
        }
      })
    },

    * changeNoticeReadState({payload}, {call, put, select}) {  // 传入 payload 的是消息的 id
      const notices: NoticeItem[] = yield select(state => {
        return state.global.notices.map(item => {
          const notice = {...item};
          if (notice.id == payload) {
            notice.isRead = true;
          }
          return notice;
        });
      });

      yield put({
        type: 'saveNotices',
        payload: notices,
      });

      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          unreadCount: notices.filter(item => !item.isRead).length,
        }
      })
    },

    * clearNotices({payload}, {call, put, select}) {  // 传入 payload 的是消息选项卡的 tabKey
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.isRead).length
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          unreadCount,
        },
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, {payload}) {
      return {
        ...state!,
        collapsed: payload,
      }
    },

    saveNotices(state, {payload}) {
      return {
        ...state!,
        notices: payload,
      };
    },

    saveClearedNotices(state, {payload}) {
      return {
        ...state!,
        notices: state!.notices.filter(item => item.type != payload),
      }
    }
  },
};

export default GlobalModel;
