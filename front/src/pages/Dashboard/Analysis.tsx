import React, {lazy, Suspense} from 'react';
import {Row, Col, Dropdown, Icon, Menu} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';
import styles from './Analysis.less';

import {genSalesData, genVisitData, genRankingListData, genVisitData2,
  genOfflineData, genOfflineChartData} from './genData';

const IntroduceRow = lazy(() => import('./IntroduceRow'));
const SalesCard = lazy(() => import('./SalesCard'));
const TopSearch = lazy(() => import('./TopSearch'));
const ProportionSales = lazy(() => import('./ProportionSales'));
const OfflineData = lazy(() => import('./OfflineData'));

const menu = (
  <Menu>
    <Menu.Item>操作一</Menu.Item>
    <Menu.Item>操作二</Menu.Item>
  </Menu>
);
const dropdownGroup = (
  <span className={styles.iconGroup}>
    <Dropdown overlay={menu} placement="bottomRight">
      <Icon type="ellipsis"></Icon>
    </Dropdown>
  </span>
);

interface AnalysisProps {
}

interface AnalysisState {
}

class Analysis extends React.Component<AnalysisProps, AnalysisState> {

  readonly state: Readonly<AnalysisState>;

  constructor(props: AnalysisProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <GridContent>
        <Suspense fallback={<PageLoading/>}>
          <IntroduceRow visitData={genVisitData()}/>
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
            salesData={genSalesData()}
            rankingListData={genRankingListData()}
          />
        </Suspense>
        <Row gutter={24} type="flex">
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                dropdownGroup={dropdownGroup}
                visitData={genVisitData2()}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
        </Row>
        <Suspense fallback={null}>
          <OfflineData
            offlineData={genOfflineData()}
            offlineChartData={genOfflineChartData()}
          />
        </Suspense>
      </GridContent>
    )
  }
}

export default Analysis;
