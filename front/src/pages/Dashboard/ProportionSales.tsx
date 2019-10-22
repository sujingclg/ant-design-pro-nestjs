import React, {memo} from "react";
import {Card, Radio} from 'antd';
import { Pie } from '@/components/Charts';
import styles from 'Analysis.less';

interface ProportionSalesProps {
  dropdownGroup: React.ReactNode;
}

const ProportionSales: React.FC<ProportionSalesProps> = memo(props => {
  const {dropdownGroup} = props;
  return (
    <Card
      bordered={false}
      style={{marginTop: '24px'}}
      title="销售额类别占比"
    >
      <h4 style={{marginTop: 10, marginBottom: 32}}>销售额</h4>
      <Pie />
    </Card>
  )
});

export default ProportionSales;
