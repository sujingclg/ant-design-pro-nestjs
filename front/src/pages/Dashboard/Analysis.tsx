import React, {lazy, Suspense} from 'react';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';
import styles from './Analysis.less';

import {genSalesData, genVisitData, genRankingListData} from './genData';

const IntroduceRow = lazy(() => import('./IntroduceRow'));
const SalesCard = lazy(() => import('./SalesCard'));

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
          <IntroduceRow visitData={genVisitData()} />
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
            salesData={genSalesData()}
            rankingListData={genRankingListData()}
          />
        </Suspense>
      </GridContent>
    )
  }
}

export default Analysis;
