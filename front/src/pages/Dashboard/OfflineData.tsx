import React, {useState} from "react";
import {Row, Col, Card, Tabs} from 'antd';
import { TimelineChart, Pie } from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';
import styles from 'Analysis.less';

const {TabPane} = Tabs;

const CustomTab = (
  {data, activeTabKey}: { data: { name: string, cvr: number }, activeTabKey: string }
) => (
  <Row gutter={8} style={{width: '138px', margin: '8px 0'}}>
    <Col span={12}>
      <NumberInfo
        title={data.name}
        subTitle="转化率"
        gap={2}
        total={`${data.cvr * 100}%`}
        theme={data.name !== activeTabKey ? 'light' : 'black'}
      />
    </Col>
    <Col span={12} style={{ paddingTop: 36 }}>
      <Pie
        height={64}
        innerRadius={32}
      />
    </Col>
  </Row>
);

interface OfflineDataProps {
  offlineData: any[];
  offlineChartData: any[];
}

const OfflineData: React.FC<OfflineDataProps> = (props => {
  const {offlineData, offlineChartData} = props;
  const [currentTabKey, setCurrentTabKey] = useState(offlineData[0].name);
  return (
    <Card
      bordered={false}
      style={{marginTop: '24px'}}
    >
      <Tabs activeKey={currentTabKey} onChange={activeKey => setCurrentTabKey(activeKey)}>
        {offlineData.map(shop => (
          <TabPane tab={<CustomTab data={shop} activeTabKey={currentTabKey} />} key={shop.name}>
            <div style={{padding: '0 24px'}}>
              <TimelineChart
                height={400}
                data={offlineChartData}
              />
            </div>
          </TabPane>
        ))}
      </Tabs>
    </Card>
  )
});

export default OfflineData;
