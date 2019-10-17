import React, {Fragment} from 'react';
import {Form, Button} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {connect} from 'dva';
import moment from 'moment';
import {FormattedMessage} from 'umi-plugin-react/locale';
import {Dispatch, ConnectState} from '@/models/connect';
import {TestPlannerModelState, matClassData} from '../model';
import styles from './index.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

function mapStateToProps(
  {testPlanner, user, loading}: { testPlanner: TestPlannerModelState } & ConnectState,
): Partial<Step3Props> {
  return {
    publisher: user.currentUser!.username,
    newTaskData: testPlanner.newTaskData,
    submitting: loading.effects['testPlanner/submitTaskStepForm'],
  };
}

interface Step3Props extends FormComponentProps {
  publisher: string;
  newTaskData: TestPlannerModelState['newTaskData'];
  submitting: boolean;
  dispatch?: Dispatch;
}

class Step3 extends React.Component<Step3Props, {}> {

  readonly state: Readonly<{}>;

  constructor(props: Step3Props) {
    super(props);
    this.state = {};
  }

  onValidateForm = (event: React.FormEvent) => {
    event.preventDefault();
    const {publisher, newTaskData, dispatch, form} = this.props;
    const {validateFields} = form;
    validateFields((err, values) => {
      if (dispatch && !err) {
        dispatch({
          type: 'testPlanner/submitTaskStepForm',
          payload: {
            ...newTaskData,
            ...values,
            publisher,
            date: moment(),
          },
        });
      }
    });
  };

  onPrev = () => {
    const {dispatch} = this.props;
    if (dispatch) {
      dispatch({
        type: 'testPlanner/saveCurrentTaskStep',
        payload: 'sampleInfo',
      });
    }
  };

  render() {
    const {publisher, newTaskData, submitting} = this.props;
    return (
      <Fragment>
        <Form layout='horizontal' className={styles.stepForm}>
          <FormItem {...formItemLayout} className={styles.stepFormText} label='发布者'>
            {publisher}
          </FormItem>
          <FormItem {...formItemLayout} className={styles.stepFormText} label='材料分类'>
            {matClassData.filter((item) => item.key === newTaskData.matClass)[0].name}
          </FormItem>
          <FormItem {...formItemLayout} className={styles.stepFormText} label='材料类型'>
            {newTaskData.matType}
          </FormItem>
          <FormItem {...formItemLayout} className={styles.stepFormText} label='材料批次'>
            {newTaskData.lotNum}
          </FormItem>
          <FormItem {...formItemLayout} className={styles.stepFormText} label='供应商'>
            {newTaskData.supplier}
          </FormItem>
          <FormItem {...formItemLayout} className={styles.stepFormText} label='起止日期'>
            {newTaskData.startStopDate![0].format('YYYY-MM-DD')}
            &nbsp; ~ &nbsp;
            {newTaskData.startStopDate![1].format('YYYY-MM-DD')}
          </FormItem>
          <FormItem
            wrapperCol={{
              xs: {span: 24, offset: 0},
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=''
          >
            <Button type='primary' onClick={this.onValidateForm} loading={submitting}>
              <FormattedMessage id='taskTable.submit' defaultMessage='Submit'/>
            </Button>
            <Button onClick={this.onPrev} style={{marginLeft: 8}}>
              <FormattedMessage id='taskTable.prev' defaultMessage='Prev'/>
            </Button>
          </FormItem>
        </Form>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Form.create<Step3Props>()(Step3));
