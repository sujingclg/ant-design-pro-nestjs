import React, {lazy, Suspense} from 'react';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';
import styles from './Analysis.less';

const IntroduceRow = lazy(() => import('./IntroduceRow'));

interface AnalysisProps {}

interface AnalysisState {}

class Analysis extends React.Component<AnalysisProps, AnalysisState> {
  
  readonly state: Readonly<AnalysisState>;
  
  constructor(props: AnalysisProps) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow />
        </Suspense>
      </GridContent>
    )
  }
}

export default Analysis;
