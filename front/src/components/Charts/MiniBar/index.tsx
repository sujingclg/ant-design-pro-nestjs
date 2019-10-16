import React from "react";
import {Chart, ChartProps, Tooltip, Geom} from "bizcharts";
import autoHeight from "../autoHeight";
import styles from "./index.less";


export interface MiniBarProps {
  data: {
    x: number | string;
    y: number;
  }[];
  height?: number;
  color?: string;
  style?: React.CSSProperties;
}

@autoHeight()
class MiniBar extends React.Component<MiniBarProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: MiniBarProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data,
      height,
      color = '#1890FF',
    } = this.props;

    const scaleProps = {
      x: {type: 'cat'},
      y: {min: 0}  // 将柱状图的0刻度线对齐到包含容器的下边界
    };

    const padding: ChartProps['padding'] = [10, 0, 30, 0];
    const chartHeight = height! + 30;  // 当柱状图为负值时可伸出下边界的距离, 注意应与padding的下边距相等

    const tooltip: [string, (...args: any[]) => {name?: string; value: string}] = [
      'x*y', (x, y) => ({name: x, value: y}),
    ];

    return (
      <div className={styles.miniChart} style={{height}}>
        <div className={styles.chartContent}>
          {height! > 0 && (
            <Chart
              height={chartHeight}
              scale={scaleProps}
              forceFit={true}
              data={data}
              padding={padding}
            >
              <Tooltip showTitle={false} crosshairs={false} />
              <Geom type="interval" position="x*y" color={color} tooltip={tooltip} shape="smooth" />
            </Chart>
          )}
        </div>
      </div>
    )
  }
}

export default MiniBar;