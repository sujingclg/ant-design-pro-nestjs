import {Reducer} from 'redux';
import {getBulletins} from './service';
import {Effect} from '@/models/connect';

// const delay = (millisecond: number) => {
//   return new Promise(resolve => {
//     setTimeout(resolve, millisecond)
//   })
// };

export interface BulletinCard {
  id: number;
  title: string;
  body: string;
  timestamp: string;
  author: string;
}

export interface BulletinModelState {
  cardList: BulletinCard[];
  currentIndex: number;
  totalCards?: number;
}

export interface BulletinsModelType {
  namespace: string;
  state: BulletinModelState;
  effects: {
    queryBulletins: Effect;
  };
  reducers: {
    changeCardList: Reducer<BulletinModelState>;
    changeCurrentIndex: Reducer<BulletinModelState>;
  };
}

const BulletinsModel: BulletinsModelType = {
  namespace: 'bulletins',
  state: {
    cardList: [],
    currentIndex: 0,
  },

  effects: {
    // *queryInitCards(_: any, sagaEffects: any) {
    //   const {call, put} = sagaEffects;
    //   const endPointURI = '/api_v1/bulletins/';
    //
    //   const bulletinItem = yield call(axios.get, endPointURI);
    //   yield put({fieldId: 'addNewCard', payload: bulletinItem.data});
    //
    //   yield call(delay, 3000);
    //
    //   const bulletinItem2 = yield call(axios.get, endPointURI);
    //   yield put({fieldId: 'addNewCard', payload: bulletinItem2.data})
    // },

    *queryBulletins(action, {call, put}) {
      const {currentPage, pageSize}  = action.payload;
      const response = yield call(getBulletins, {currentPage, pageSize});
      yield put({type: 'changeCardList', payload: response});
    },
  },

  reducers: {
    // 第一个传入参数为更新前组件的状态
    // 第二个传入参数是mapDispatchToProps中传入dispatch的action对象
    changeCardList(state, {payload}) {
      const {cards: cardList, totalCards} = payload;
      return {
        cardList,
        currentIndex: 0,
        totalCards,
      };
    },

    changeCurrentIndex(state, {payload}) {
      return {
        ...state!,
        currentIndex: payload.cardIndex,

      };
    },
  },
};

export default BulletinsModel;
