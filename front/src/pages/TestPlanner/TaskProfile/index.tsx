import React, {Fragment} from "react";
import {connect} from "dva";
import {Alert, Button, Dropdown, Icon, Menu, Card, Divider} from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import DescriptionList from "@/components/DescriptionList";
import {TaskItemType, TestPlannerModelState} from "@/pages/TestPlanner/model";
import {ConnectState} from "@/models/connect";

const {Group: ButtonGroup} = Button;
const action = (
  <Fragment>
    <ButtonGroup style={{marginRight: '9px'}}>
      <Button>操作一</Button>
      <Button>操作二</Button>
      <Dropdown overlay={  <Menu>
        <Menu.Item key="1">选项一</Menu.Item>
        <Menu.Item key="2">选项二</Menu.Item>
        <Menu.Item key="3">选项三</Menu.Item>
      </Menu>} placement="bottomRight">
        <Button>
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">主操作</Button>
  </Fragment>
);

const {Description} = DescriptionList;

interface TaskProfileProps {
  reviewingTask: TaskItemType;
}

@connect((
  {testPlanner, loading}: { testPlanner: TestPlannerModelState } & ConnectState
): Partial<TaskProfileProps> => ({
  reviewingTask: testPlanner.reviewingTask,
}))
class TaskProfile extends React.Component<TaskProfileProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: TaskProfileProps) {
    super(props);
    this.state = {};
  }

  renderPageHeaderContent() {
    const {reviewingTask} = this.props;
    if (!reviewingTask) {
      return (
        <Alert
          message="未指定测试任务"
          description="请在总览中点击某个测试任务的详情链接以查看"
          type="warning"
          showIcon
        />
      );
    }
    return null;
  }

  render() {
    return (
      <PageHeaderWrapper
        title="测试任务详情"
        extra={action}
        content={this.renderPageHeaderContent()}
      >
        <Card title="测试信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList size="large" title="材料信息" style={{ marginBottom: 32 }}>
            <Description term="材料号">123123123</Description>
            <Description term="状态">执行中</Description>
            <Description term="批次号">450000199210211469</Description>
            <Description term="测试计划编号">230000197502012736</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="发布人姓名">黄某某</Description>
            <Description term="工号">32943898021309809423</Description>
            <Description term="身份证">3321944288191034921</Description>
            <Description term="联系方式">18112345678</Description>
            <Description term="联系地址">
              上海市闵行区吴泾镇莲花南路3998号
            </Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default TaskProfile;