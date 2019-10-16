import {BadgeProps} from "antd/lib/badge";
import {Reducer} from "redux";
import {Moment} from "moment";
import pick from "lodash/pick";
import {Effect} from "@/models/connect";
import {getTestPlannerOverviewData, submitForm} from "./service";


const overviewData: TaskItemType[] = [
  {
    key: '1',
    matClass: 'composite',
    matType: 'Fiber',
    lotNum: 'LMN-AGP193-PW',
    publisher: 'XuFang',
    supplier: 'ABC',
    date: '2016-05-09T07:10:16.526991Z',
    status: 'Finished',
  },
  {
    key: '2',
    matClass: 'metals',
    matType: 'Alloy',
    lotNum: 'LMN-AGP193-PW',
    publisher: 'LuLiang',
    supplier: 'EDD',
    date: '2017-04-23T13:10:16.526991Z',
    status: 'Refused',
  },
  {
    key: '3',
    matClass: 'composite',
    matType: 'Laminate',
    lotNum: 'LMN-AGP193-PW',
    publisher: 'LuLiang',
    supplier: 'EDD',
    date: '2017-09-20T13:10:16.526991Z',
    status: 'Testing',
  },
  {
    key: '4',
    matClass: 'weld',
    matType: '基材',
    lotNum: 'LMN-AGP193-PW',
    publisher: 'LuLiang',
    supplier: 'EDD',
    date: `2018-01-29T13:10:16.526991Z`,
    status: 'Checked',
  },
  {
    key: '5',
    matClass: 'weld',
    matType: '焊料',
    lotNum: 'LMN-AGP193-PW',
    publisher: 'LuLiang',
    supplier: 'EDD',
    date: `2018-01-01T13:10:16.526991Z`,
    status: 'Created',
  },
];

const delay = (millisecond: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, millisecond)
  })
};

export const statusMap: {[key: string]: BadgeProps['status']} = {
  Created: 'default',
  Testing: 'processing',
  Checked: 'warning',
  Finished: 'success',
  Refused: 'error',
};

type MaterialClassName = 'metals' | 'weld' | 'composite';

// export const matClassData: {key: keyof typeof matTypeData, name: string}[] = [
export const matClassData: {key: MaterialClassName, name: string}[] = [
  {key: 'metals', name:'金属材料'},
  {key: 'weld', name: '焊接材料'},
  {key: 'composite', name: '复合材料'}];

export const matTypeData: {[key in MaterialClassName]: string[]} = {
  metals: ['金属', '合金'],
  weld: ['基材', '焊料'],
  composite: ['纤维', '基体', '层压板', '预制体'],
};

export interface TaskItemType {
  key: string;
  matClass: MaterialClassName,
  matType: string,
  lotNum: string;
  supplier: string;
  publisher: string;
  date: string;
  status: keyof typeof statusMap,
  [key: string]: any;
}

export interface TestPlannerModelState {
  overviewData?: TaskItemType[];
  currentTaskPage?: 'testInfo' | 'sampleInfo' | 'confirm' | 'result';
  reviewingTask?: TaskItemType;
  newTaskData: {
    matClass: keyof typeof matTypeData,
    matType: string,
    lotNum?: string,
    supplier?: string,
    startStopDate?: [Moment, Moment];
  };
}

interface TestPlannerModelType {
  namespace: 'testPlanner';
  state: TestPlannerModelState;
  effects: {
    // fetchOverviewData: Effect;
    submitTaskStepForm: Effect;
  };
  reducers: {
    saveOverviewData: Reducer<TestPlannerModelState>;
    saveCurrentTaskStep: Reducer<TestPlannerModelState>;
    saveTaskStepFormData: Reducer<TestPlannerModelState>;
    updateOverviewData: Reducer<TestPlannerModelState>;
  };
}

const TestPlannerModel: TestPlannerModelType = {
  namespace: 'testPlanner',

  state: {
    newTaskData: {
      matClass: matClassData[0].key,
      matType: matTypeData[matClassData[0].key][0],
    },
    overviewData,
  },

  effects: {
    // * fetchOverviewData({payload}, {call, put}) {
    //   const response = yield call(getTestPlannerOverviewData, payload);
    //   console.log(payload);
    //   yield put({
    //     type: 'saveOverviewData',
    //     payload: response,
    //   });
    // },

    * submitTaskStepForm({payload}, {call, put}) {
      const newTaskItem: TaskItemType = {
        // ...pick(payload!.newTaskData, ['matClass', 'matType', 'lotNum', 'supplier', 'publisher']),
        ...payload,
        key: Math.floor(Math.random()*1000),
        status: 'Created',
      };
      yield call(submitForm, newTaskItem);

      // TODO 待删除
      yield put({
        type: 'updateOverviewData',
        payload: newTaskItem,
      });

      yield put({
        type: 'saveCurrentTaskStep',
        payload: 'result',
      });
      // yield put({
      //   type: 'resetNewTaskData',
      // });
    },
  },

  reducers: {
    saveOverviewData(state, {payload}) {
      return {
        ...state!,
        overviewData: payload.overviewData,
      };
    },

    saveCurrentTaskStep(state, {payload}) {
      return {
        ...state!,
        currentTaskPage: payload,
      };
    },

    saveTaskStepFormData(state, {payload}) {
      return {
        ...state,
        newTaskData: {
          ...state!.newTaskData,
          ...payload,
        }
      };
    },

    // TODO 待删除
    updateOverviewData(state, {payload}) {
      const newOverviewData = state!.overviewData;
      newOverviewData!.unshift(payload);
      return {
        ...state!,
        overviewData: newOverviewData,
      }
    }
  },
};

export default TestPlannerModel;