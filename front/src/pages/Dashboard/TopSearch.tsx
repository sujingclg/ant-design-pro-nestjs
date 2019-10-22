import React, {memo} from "react";
import {Card, Row, Col, Tooltip, Icon, Table} from 'antd';
import numeral from 'numeral';
import {MiniArea} from '@/components/Charts';
import Trend from '@/components/Trend';
import NumberInfo from '@/components/NumberInfo';
import styles from './Analysis.less';

const columns = [
  {
    title: '排名',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '搜索关键词',
    dataIndex: 'keyword',
    key: 'keyword',
  },
  {
    title: '用户数',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: '周涨幅',
    dataIndex: 'range',
    key: 'range',
  },
];

interface TopSearchProps {
  dropdownGroup: React.ReactNode;
  visitData: { x: number | string; y: number; }[];
}

const TopSearch: React.FC<TopSearchProps> = memo(props => {
  const {dropdownGroup, visitData} = props;
  return (
    <Card bordered={false} title="线上热门搜索" extra={dropdownGroup} style={{marginTop: '24px'}}>
      <Row gutter={68}>
        <Col sm={12} xs={24} style={{marginBottom: '24px'}}>
          <NumberInfo
            subTitle={
              <span>
                搜索用户数
                <Tooltip title="指标说明">
                  <Icon style={{marginLeft: '8px'}} type="info-circle-o" />
                </Tooltip>
              </span>
            }
            gap={8}
            total={numeral(12321).format('0,0')}
            status="up"
            subTotal={17.1}
          />
          <MiniArea hasLine height={45} data={visitData} />
        </Col>
        <Col sm={12} xs={24} style={{marginBottom: '24px'}}>
          <NumberInfo
            subTitle={
              <span>
                人均搜索次数
                <Tooltip title="指标说明">
                  <Icon style={{marginLeft: '8px'}} type="info-circle-o" />
                </Tooltip>
              </span>
            }
            gap={8}
            total={2.7}
            status="down"
            subTotal={0.62}
          />
          <MiniArea hasLine height={45} data={visitData} />
        </Col>
      </Row>
      <Table
        rowKey={(record: any) => record.index}
        size="small"
        columns={columns}
        dataSource={[]}
        pagination={{
          // style: { marginBottom: 0 },
          pageSize: 5,
        }}
      />
    </Card>
  )
});

export default TopSearch;
