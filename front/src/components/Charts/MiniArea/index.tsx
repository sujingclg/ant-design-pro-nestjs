import React from "react";
import {Chart, ChartProps, Axis, AxisProps, Tooltip, Geom} from "bizcharts";
import autoHeight from "../autoHeight";
import styles from "./index.less";


export interface MiniAreaProps {
  data: {
    x: number | string;
    y: number;
  }[];
  height?: number;
  color?: string;
  hasLine?: boolean;
  borderColor?: string;
  borderWidth?: number;
  xAxis?: AxisProps;
  yAxis?: AxisProps;
  style?: React.CSSProperties;
}

@autoHeight()
class MiniArea extends React.Component<MiniAreaProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: MiniAreaProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data,
      height,
      color = 'rgba(24, 144, 255, 0.2)',
      hasLine,
      borderColor = '#1890FF',
      borderWidth = 2,
      xAxis,
      yAxis,
    } = this.props;

    const scaleProps = {
      x: {
        // 对于分类数据的坐标轴两边默认会留下一定的空白，连续数据的坐标轴的两端没有空白刻度。
        type: 'cat',  // 分类数据
        range: [0, 1],  // 将数据源中x轴的范围映射到坐标轴上的 [0, 1] 范围内以消除两端空白
      },
      y: {
        min: 0,  // 将柱状图的0刻度线对齐到包含容器的下边界
      }
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
              forceFit={true}  // 开启宽度自适应
              data={data}
              padding={padding}
            >
              <Axis key="axis-x" name="x" visible={false} {...xAxis} />  {/* name 属性用于指定对应到数据源中的字段名 */}
              <Axis key="axis-y" name="y" visible={false} {...yAxis} />
              <Tooltip showTitle={false} crosshairs={false} />
              <Geom type="area" position="x*y" color={color} tooltip={tooltip} shape="smooth"/>
              {hasLine ? (
                <Geom type="line" position="x*y" color={borderColor} size={borderWidth} tooltip={tooltip} shape="smooth"/>
              ) : (
                <span style={{display: 'none'}} />
              )}
            </Chart>
          )}
        </div>
      </div>
    )
  }
}

export default MiniArea;