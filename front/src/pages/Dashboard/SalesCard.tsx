import React, {memo} from "react";
import {Card, Tabs, DatePicker, Row, Col} from 'antd';
import numeral from 'numeral';
import classNames from 'classnames';
import {Bar} from '@/components/Charts'
import styles from './Analysis.less';

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;

interface SalesCardProps {
  salesData: { x: string; y: number; }[];
  rankingListData: { title: string; total: number }[];
}

const SalesCard: React.FC<SalesCardProps> = memo(props => {
  const {salesData, rankingListData} = props;
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <a href="#">今日</a>
                <a href="#">本周</a>
                <a href="#">本月</a>
                <a href="#">全年</a>
              </div>
              <RangePicker style={{ width: '256px' }}/>
            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: '24px' }}
        >
          <TabPane tab="销售额" key="sales">
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={295}
                    title="销售趋势"
                    data={salesData}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>门店销售额排名</h4>
                  <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                      <li key={item.title}>
                        <span className={classNames(styles.rankingItemNumber, {[styles.active]: i < 3})}>{i+1}</span>
                        <span className={styles.rankingItemTitle}>{item.title}</span>
                        <span>{numeral(item.total).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="访问量" key="visits">
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={295}
                    title="访问量趋势"
                    data={salesData}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>门店访问量排名</h4>
                  <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                      <li key={item.title}>
                        <span className={classNames({[styles.rankingItemNumber]: true, [styles.active]: i < 3})}>{i+1}</span>
                        <span className={styles.rankingItemTitle}>{item.title}</span>
                        <span>{numeral(item.total).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  )
});

export default SalesCard;
