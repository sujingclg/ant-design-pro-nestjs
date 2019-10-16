import React from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import {TimelineChart} from "@/components/Charts";
import {TimelineChartProps} from "@/components/Charts/TimelineChart";

const offlineChartData: TimelineChartProps["data"] = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

export default () => {
  return (
    <PageHeaderWrapper
      title={"Data Analysis"}
      content={"Timeline chart"}
      extraContent={"Timeline chart"}
    >
      <div style={{backgroundColor: "#FFF", width: "800px"}}>
        <TimelineChart
          data={offlineChartData}
          height={400}
          title="Timeline chart"
          titleMap={{
            y1: "Traffic",
            y2: "Payments",
          }}
        />
      </div>
    </PageHeaderWrapper>
  );
};
