import React, {memo} from 'react';
import {Row, Col, Icon, Tooltip} from 'antd';
import numeral from 'numeral';
import Charts from '@/components/Charts';
import Trend from "@/components/Trend";
import styles from './Analysis.less';

const {MiniBar, MiniArea, MiniProgress, Field, ChartCard} = Charts;

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {marginBottom: '24px'},
};

interface IntroduceRowProps {
  visitData: { x: number | string; y: number; }[];
}

const IntroduceRow: React.FC<IntroduceRowProps> = memo(props => {
  const {visitData} = props;
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="总销售额"
          action={<Tooltip title="指标说明"><Icon type="info-circle-o"/></Tooltip>}
          // loading={true}
          total={`¥ ${numeral(126560).format('0,0')}`}
          footer={<Field label="日销售额" value={`￥${numeral(12423).format('0,0')}`}/>}
          contentHeight={46}
        >
          <Trend flag="up" style={{marginRight: '16px'}}>
            周同比 <span className={styles.trendText}>12%</span>
          </Trend>
          <Trend flag="down">
            日同比 <span className={styles.trendText}>11%</span>
          </Trend>
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="访问量"
          action={<Tooltip title="指标说明"><Icon type="info-circle-o"/></Tooltip>}
          total={numeral(8846).format('0,0')}
          footer={<Field label="日访问量" value={numeral(1234).format('0,0')}/>}
          contentHeight={46}
        >
          <MiniArea color="#975FE4" data={visitData}/>
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="支付笔数"
          action={<Tooltip title="指标说明"><Icon type="info-circle-o"/></Tooltip>}
          total={numeral(6560).format('0,0')}
          footer={<Field label="转化率" value="60%"/>}
          contentHeight={46}
        >
          <MiniBar data={visitData}/>
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="运营活动效果"
          action={<Tooltip title="指标说明"><Icon type="info-circle-o"/></Tooltip>}
          total="38%"
          footer={
            <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
              <Trend flag="up" style={{marginRight: '16px'}}>
                周同比 <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日同比 <span className={styles.trendText}>11%</span>
              </Trend>
            </div>
          }
          contentHeight={46}
        >
          <MiniProgress
            target={80}
            targetLabel="目标值: 80%"
            strokeWidth={8}
            color="#13C2C2"
            percent={38}
          />
        </ChartCard>
      </Col>
    </Row>
  )
});


export default IntroduceRow;
