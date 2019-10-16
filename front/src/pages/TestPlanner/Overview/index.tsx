import React, {Fragment} from "react";
import {connect} from "dva";
import moment from "moment";
import {Form, Row, Col, Input, Select, Button, Card, Badge, Divider, Modal, Steps} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {formatMessage} from "umi-plugin-react/locale";
import StandardTable from "@/components/StandardTable";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import {ConnectState, Dispatch} from "@/models/connect";
import {matClassData, statusMap, TaskItemType, TestPlannerModelState} from "../model";
import styles from "./index.less";

// for (let i = 4; i < 100; i++) {
//   dataSource.push({
//     key: String(i),
//     matClass: 'Composite',
//     matType: 'Laminate',
//     lotNum: 'LMN-AGP193-PW',
//     publisher: 'LuLiang',
//     supplier: 'EDD',
//     date: `2018-01-${Math.floor(10 + Math.random()* 20)}T13:10:16.526991Z`,
//     status: 'Checked',
//   })
// }

const {Option} = Select;
const {Step} = Steps;

const ConfigForm: React.FC<{ modalVisible: boolean; onCancel: () => void }> = props => {
  const {modalVisible} = props;
  return (
    <Modal visible={modalVisible} title="配置" footer={null} onCancel={props.onCancel}>
      <Steps direction="vertical" size="small" current={1}>
        <Step title="Finished" description="Initiate a testing task."/>
        <Step title="In Progress" description="Team leader's verification."/>
        <Step title="Waiting" description="Testing task has been published."/>
      </Steps>
    </Modal>
  );
};

interface OverviewTableProps extends FormComponentProps {
  overviewData: TaskItemType[];
  isFetchingData: boolean;
  dispatch: Dispatch;
}

interface OverviewTableState {
  formValues: {};
  modalVisible: boolean;
}

class OverviewTable extends React.PureComponent<OverviewTableProps, OverviewTableState> {

  readonly state: Readonly<OverviewTableState>;

  private _columns = [
    {
      title: "材料分类",
      dataIndex: "matClass",
      filters: [
        {text: "composite", value: "composite"},
        {text: "metals", value: "metals"},
        {text: "weld", value: "weld"},
      ],
      onFilter: (value: string, record: TaskItemType) => record.matClass.indexOf(value) == 0,
    },
    {title: "材料类型", dataIndex: "matType"},
    {title: formatMessage({id: "taskTable.lotNum", defaultMessage: "Lot Number"}), dataIndex: "lotNum"},
    {title: formatMessage({id: "taskTable.supplier", defaultMessage: "Supplier"}), dataIndex: "supplier"},
    {title: formatMessage({id: "taskTable.publisher", defaultMessage: "Publisher"}), dataIndex: "publisher"},
    {
      title: formatMessage({id: "taskTable.date", defaultMessage: "Publish Date"}),
      dataIndex: "date",
      render: (val: string) => <span>{moment(val).format("YYYY/MM/DD")}</span>,
      sorter: (a: TaskItemType, b: TaskItemType) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: formatMessage({id: "taskTable.status", defaultMessage: "Status"}),
      dataIndex: "status",
      render: (val: string) => <Badge status={statusMap[val]} text={val}/>,
      filters: Object.keys(statusMap).map((key) => ({text: key, value: key})),
      onFilter: (value: string, record: TaskItemType) => (record.status as string).indexOf(value) == 0,
    },
    {
      title: "操作",
      render: ({key}: { key: string }) => (
        <Fragment>
          <a onClick={() => this.setState({modalVisible: true})}>配置</a>
          <Divider type="vertical"/>
          <a onClick={() => console.log(key)}>详情</a>
        </Fragment>
      ),
    },
  ];

  constructor(props: OverviewTableProps) {
    super(props);
    this.state = {
      formValues: {},
      modalVisible: false,
    };
  }

  componentDidMount() {
    // const {overviewData, dispatch} = this.props;
    // if (!overviewData){
    //   dispatch && dispatch({
    //     type: 'testPlanner/fetchOverviewData'
    //   });
    // }
  }

  handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const {form} = this.props;
    form.validateFields((err, values) => {
      if (err) { return; }
      this.setState({
        formValues: values,
      });
    });
    console.log(this.state.formValues);
  }

  handleConfigFormCancel = () => {
    this.setState({
      modalVisible: false,
    });
  }

  handleFormReset = () => {
    const {form} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  }

  renderQueryForm(): React.ReactNode {
    const {form: {getFieldDecorator}} = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>  {/* 响应式区块间隔 */}
          <Col md={8} sm={24}>
            <Form.Item label="材料批次号">
              {getFieldDecorator("lotNum")(
                <Input placeholder="请输入"/>,
                // <Select placeholder="请选择">
                //  {matClassData.map(item => (
                //    <Option key={item.key}>{item.name}</Option>
                //  ))}
                // </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="执行状态">
              {getFieldDecorator("status")(
                <Select placeholder="请选择">
                  {Object.keys(statusMap).map((key) => (
                    <Option key={key}>{key}</Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {overviewData, isFetchingData} = this.props;
    return (
      <PageHeaderWrapper title="浏览全部任务">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderQueryForm()}</div>
            <StandardTable
              columns={this._columns}
              data={{list: overviewData}}
              loading={isFetchingData}
            />
          </div>
        </Card>
        <ConfigForm modalVisible={this.state.modalVisible} onCancel={this.handleConfigFormCancel}/>
      </PageHeaderWrapper>
    );
  }
}

export default connect((
  {testPlanner, loading}: { testPlanner: TestPlannerModelState } & ConnectState,
): Partial<OverviewTableProps> => ({
  overviewData: testPlanner.overviewData,
  // isFetchingData: loading.effects['testPlanner/fetchOverviewData'],
}))(Form.create<OverviewTableProps>()(OverviewTable));
