import React from "react";
import {Tooltip, Icon} from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import {MiniBar, ChartCard, MiniArea, Field, MiniProgress} from "@/components/Charts";
import Trend from "@/components/Trend";

const data = [
  {genre: "Sports", sold: 275, income: 2300},
  {genre: "Strategy", sold: 115, income: 667},
  {genre: "Action", sold: 120, income: 982},
  {genre: "Shooter", sold: 350, income: 5271},
  {genre: "Other", sold: 150, income: 3710},
];

const data2 = data.map(item => {
  return {x: item.genre, y: item.sold};
});

export default () => {
  return (
    <PageHeaderWrapper
      title={"Data Analysis"}
      content={"Mini cards"}
      extraContent={"Mini cards"}
    >
      <div style={{ width: "300px"}}>
        <ChartCard
          bordered={false}
          title="Mini Bar"
          // avatar={'avatar'}
          action={
            <Tooltip
              title="Mini Bar"
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total="231,213"
          footer={
            <Trend flag="down">
              <div>Weekly Changes 12%</div>
            </Trend>
          }
          contentHeight={46}
        >
          <MiniBar data={data2}/>
        </ChartCard>
      </div>
      <br/>
      <div style={{ width: "300px"}}>
        <ChartCard
          bordered={false}
          title="Mini Area"
          // avatar={'avatar'}
          action={
            <Tooltip
              title="Mini Area"
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total="231,213"
          footer={<Field label="footer label" value="1,342" />}
          contentHeight={46}
        >
          <MiniArea color="#975FE4" data={data2}/>
        </ChartCard>
      </div>
      <br/>
      <div style={{ width: "300px"}}>
        <ChartCard
          title="Mini Progress"
          action={
            <Tooltip
              title="Mini Progress"
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total="231,213"
          footer={
            <Trend flag="up">
              Weekly Changes 12%
            </Trend>
          }
          contentHeight={46}
        >
          <MiniProgress
            target={80}
            targetLabel="Target value: 80%"
            strokeWidth={8}
            percent={78}
            // color={'#c21f27'}
          />
        </ChartCard>
      </div>
    </PageHeaderWrapper>
  );
};
