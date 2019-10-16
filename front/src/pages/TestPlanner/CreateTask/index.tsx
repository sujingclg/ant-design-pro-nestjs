import React from 'react';
import {Card, Steps} from 'antd';
import {connect} from 'dva';
import {formatMessage} from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import {TestPlannerModelState} from '../model';
import styles from './index.less';

const {Step} = Steps;

function mapStateToProps({testPlanner}: {testPlanner: TestPlannerModelState}): Partial<CreateTaskProps> {
  return {
    currentPage: testPlanner.currentTaskPage,
  };
}

interface CreateTaskProps {
  currentPage?: TestPlannerModelState['currentTaskPage'];
}

class CreatePlanner extends React.Component<CreateTaskProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: CreateTaskProps) {
    super(props);
    this.state = {};
  }

  getCurrentStep(): number {
    const {currentPage} = this.props;
    switch (currentPage) {
      case 'testInfo':
        return 0;
      case 'sampleInfo':
        return 1;
      case 'confirm':
        return 2;
      case 'result':
        return 3;
      default:
        return 0;
    }
  }

  render() {
    const currentStep = this.getCurrentStep();
    let stepComponent;
    if (currentStep === 1) {
      stepComponent = <Step2/>;
    } else if (currentStep === 2) {
      stepComponent = <Step3/>;
    } else if (currentStep === 3) {
      stepComponent = <Step4/>;
    } else {
      stepComponent = <Step1/>;
    }

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <React.Fragment>
            <Steps current={currentStep} className={styles.steps}>
              <Step title={formatMessage(
                {id: 'taskTable.setTestInfo', defaultMessage: 'Test Info'},
              )}/>
              <Step title={formatMessage(
                {id: 'taskTable.setSampleInfo', defaultMessage: 'Sample Info'},
              )}/>
              <Step title={formatMessage(
                {id: 'taskTable.confirm', defaultMessage: 'Confirm'},
              )}/>
              <Step title={formatMessage(
                {id: 'taskTable.finished', defaultMessage: 'Finished'},
              )}/>
            </Steps>
            {stepComponent}
          </React.Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(mapStateToProps)(CreatePlanner);
