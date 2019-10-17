import React, {Fragment} from "react";
import {Form, Select, TreeSelect, Button} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {connect} from "dva";
import {FormattedMessage} from "umi-plugin-react/locale";
import {Dispatch} from "@/models/connect";
import {TestPlannerModelState, matClassData, matTypeData} from "../model";
import styles from "./index.less";

const FormItem = Form.Item;
const {Option} = Select;

// TODO 查treeData的数据类型
const treeData = [
  {
    "title": "LMN-AGP193-PW",
    "key": 153780,
    "value": 153780,
    "selectable": false,
    "children": [
      {
        "title": "MD[0,±30°,0]4",
        "key": 153781,
        "value": 153781,
        "selectable": false,
        "children": [
          {
            "title": "LMN-AGP193-PW/8552",
            "key": 153782,
            "value": "LMN-AGP193-PW/8552"
          }
        ]
      },
      {
        "title": "UD",
        "key": 153783,
        "value": 153783,
        "selectable": false,
        "children": [
          {
            "title": "LMN-AGP193-PW/8563",
            "key": 151268,
            "value": "LMN-AGP193-PW/8563"
          }
        ]
      }
    ]
  }
];

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

function mapStateToProps({testPlanner}: {testPlanner: TestPlannerModelState}): Partial<Step1Props> {
  return {
    newTaskData: testPlanner.newTaskData,
  };
}

interface Step1Props extends FormComponentProps {
  newTaskData: TestPlannerModelState['newTaskData'];
  dispatch?: Dispatch;
}

interface Step1State {
  matTypes: string[];
}

class Step1 extends React.Component<Step1Props, Step1State> {

  readonly state: Readonly<Step1State>;

  constructor(props: Step1Props) {
    super(props);
    this.state = {
      matTypes: [],
    };
  }

  componentDidMount() {
    const {newTaskData}  = this.props;
    this.setState({
      matTypes: matTypeData[newTaskData.matClass]
    })
  }

  onValidateForm = (): void => {
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
          payload: 'sampleInfo',
        });
      }
    });
  };

  handleMatClassChange = (value: keyof typeof matTypeData) => {
    const {setFieldsValue} = this.props.form;
    setFieldsValue({
      matType: matTypeData[value][0],
    });
    this.setState({
      matTypes: matTypeData[value],
    });
  };

  handleMatTypeChange = (value: string) => {};

  render() {
    const {newTaskData, form}  = this.props;
    const {getFieldDecorator} = form;
    const {matTypes} = this.state;

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <FormItem {...formItemLayout} label="材料分类">
            {getFieldDecorator('matClass', {
              initialValue: newTaskData.matClass,
              rules: [{required: true, message: '未选择材料分类'}],
            })(
              <Select placeholder="选择材料分类" onChange={this.handleMatClassChange}>
                  {matClassData.map(item => (
                    <Option key={item.key}>{item.name}</Option>
                  ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="材料类型">
            {getFieldDecorator('matType', {
              initialValue: newTaskData.matType,
              rules: [{required: true, message: '未选择材料类型'}],
            })(
              <Select placeholder="选择材料类型" onChange={this.handleMatTypeChange}>
                {matTypes.map(item => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="材料批次">
            {getFieldDecorator('lotNum', {
              initialValue: newTaskData.lotNum,
              rules: [{required: true, message: '未选择材料批次号'}],
            })(
              <TreeSelect treeData={treeData} />
            )}
          </FormItem>
          <FormItem
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
          </FormItem>
        </Form>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Form.create<Step1Props>()(Step1));
