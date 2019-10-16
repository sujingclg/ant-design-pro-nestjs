import React from "react";
import {Form, Button, Input, DatePicker} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {connect} from "dva";
import {FormattedMessage} from "umi-plugin-react/locale";
import {Dispatch} from "@/models/connect";
import {TestPlannerModelState} from "../model";
import styles from "./index.less";

const {RangePicker} = DatePicker;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

function mapStateToProps({testPlanner}: {testPlanner: TestPlannerModelState}): Partial<Step2Props> {
  return {
    newTaskData: testPlanner.newTaskData,
  };
}

interface Step2Props extends FormComponentProps {
  newTaskData: TestPlannerModelState['newTaskData'];
  dispatch?: Dispatch;
}

class Step2 extends React.Component<Step2Props, {}> {

  readonly state: Readonly<{}>;

  constructor(props: Step2Props) {
    super(props);
    this.state = {};
  }

  onValidateForm = () => {
    const {dispatch, form}  = this.props;
    const {validateFields} = form;
    validateFields((err, values) => {
      if (dispatch && !err) {
        dispatch({
          type: 'testPlanner/saveTaskStepFormData',
          payload: values,
        });
        dispatch({
          type: 'testPlanner/saveCurrentTaskStep',
          payload: 'confirm',
        });
      }
    });
  };

  onPrev = () => {
    const {dispatch}  = this.props;
    dispatch && dispatch({
      type: 'testPlanner/saveCurrentTaskStep',
      payload: 'testInfo',
    });
  };

  render() {
    const {newTaskData, form}  = this.props;
    const {getFieldDecorator} = form;

    return (
      <React.Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="供应商编号">
            {getFieldDecorator('supplier', {
              initialValue: newTaskData.supplier,
              rules: [{required: true, message: '未输入供应商编号'}],
            })(
              <Input placeholder="请输入供应商编号"/>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="起止日期">
            {getFieldDecorator('startStopDate', {
              initialValue: newTaskData.startStopDate,
              rules: [{required: true, message: '未设置起止日期'}],
            })(
              <RangePicker style={{width: '100%'}} />
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: {span: 24, offset: 0},
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              }
            }}
            label=""
          >
            <Button type="primary" onClick={this.onValidateForm}>
              <FormattedMessage id="taskTable.next" defaultMessage="Next"/>
            </Button>
            <Button onClick={this.onPrev} style={{marginLeft: 8}}>
              <FormattedMessage id="taskTable.prev" defaultMessage="prev"/>
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Form.create<Step2Props>()(Step2));