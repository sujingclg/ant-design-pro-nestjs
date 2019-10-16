import React from "react";
import {Button} from "antd";
import {connect} from "dva";
import router from "umi/router"
import {FormattedMessage, formatMessage} from "umi-plugin-react/locale";
import {Dispatch} from "@/models/connect";
import Result from "@/components/Result";
import {TestPlannerModelState} from "../model";
import styles from "./index.less";


function mapStateToProps({testPlanner}: {testPlanner: TestPlannerModelState}): Partial<Step4Props> {
  return {
  };
}

interface Step4Props {
  dispatch?: Dispatch;
}

class Step4 extends React.Component<Step4Props, {}> {

  readonly state: Readonly<{}>;

  constructor(props: Step4Props) {
    super(props);
    this.state = {};
  }

  onFinish = () => {
    const {dispatch}  = this.props;
    dispatch && dispatch({
      type: 'testPlanner/saveCurrentTaskStep',
      payload: 'matInfo',
    });
  };

  onExit = () => {
    router.push(`/test-planner/overview`);
  };

  render() {
    const actions = (
      <>
        <Button type="primary" onClick={this.onFinish}>
          <FormattedMessage id="taskTable.finish" defaultMessage="Create new one"/>
        </Button>
        <Button onClick={this.onExit}>
          <FormattedMessage id="taskTable.exit" defaultMessage="View all"/>
        </Button>
      </>
    );

    return (
      <React.Fragment>
        <Result
          type="success"
          title={formatMessage({id: 'taskTable.success', defaultMessage: 'Success'})}
          description="Some description"
          extra="Some information"
          actions={actions}
        />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Step4);