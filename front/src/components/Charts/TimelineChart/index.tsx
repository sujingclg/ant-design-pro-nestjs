import React from "react";
import {Chart, ChartProps, Axis, Tooltip, Legend, Geom} from "bizcharts";
import autoHeight from "../autoHeight";
import {Slider, DataSet} from '../_utils';
import styles from "./index.less";

export interface TimelineChartProps {
  data: {
    x: number;
    y1: number;
    y2?: number;
  }[];
  height?: number;
  title?: React.ReactNode;
  titleMap?: {y1: string; y2?: string};
  // padding?: ChartProps['padding'];
  padding?: [number, number, number, number];
  borderWidth?: number;
  style?: React.CSSProperties;
}

@autoHeight()
class TimelineChart extends React.Component<TimelineChartProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: TimelineChartProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      title,
      height = 400,
      padding = [60, 20, 40, 40] as [number, number, number, number],
      titleMap = {
        y1: 'y1',
        y2: 'y2',
      },
      borderWidth = 2,
      data: sourceData,
    } = this.props;

    const data = sourceData ? sourceData : [{x: 0, y1: 0, y2: 0}];
    data.sort((a, b) => a.x - b.x);

    let max = 0;
    if (data[0] && data[0].y1 && data[0].y2) {
      max = Math.max(
        [...data].sort((a, b) => b.y1 - a.y1)[0].y1,  // 将数组中的各个元素以各项的 y1 属性为基准进行降序排序
        [...data].sort((a, b) => b.y2! - a.y2!)[0].y2!,
      );
    }

    const ds = new DataSet({
      // start 和 end 为 DataSet 的 state 量, 对这两者的改变将触发所有关联到此 DataSet 对象的 DataView 对象的改变,
      // 从而使图表发生重绘. 这两个属性在 Slider 组件中通过 setState 方法进行修改
      state: {
        start: data[0].x,
        end: data[data.length -1].x,
      }
    });

    const dv = ds.createView();
    // 从 data 加载数据, 并作一系列数据转换
    dv.source(data).transform({
      type: 'filter',  // 仅仅过滤出在 start 和 end 之间的数据行
      callback: row => {
        const date = row.x;
        return date >= ds.state.start && date <= ds.state.end;
      }
    }).transform({
      type: 'map',  // 将数据的各行中增加两列, 对应到折线图中的不同线条
      callback: row =>{
        const newRow = {...row};
        newRow[titleMap.y1] = row.y1;
        newRow[titleMap.y2!] = row.y2;
        return newRow;
      },
    }).transform({
      // 展开字段, 原数据集中 titleMap.y1, titleMap.y2 标识了两个字段,
      // 新数据集中, 这两个字段名变为 key 字段的值, 字段值变为 value 字段的值
      // 从而变为折线图上的两条线
      type: 'fold',
      fields: [titleMap.y1, titleMap.y2],
      key: 'key',
      value: 'value',
    }).transform({
      type: 'pick',  // 过滤字段, 只留下折线图用得到的字段
      fields: ['x', 'key', 'value']
    });
    // dv变换后的最终结果可通过 dv.rows 打印出来

    const timeScale = {
      type: 'time',
      tickInterval: 60 * 60 * 1000,
      mask: 'HH:mm',
      range: [0, 1],
    };

    const scaleProps = {
      x: timeScale,
      value: {
        max,
        min: 0,
      },
    };

    const SliderGen = () => (
      <Slider
        padding={[0, padding[1] + 20, 0, padding[3]]}
        width="auto"
        height={26}
        xAxis="x"
        yAxis="y1" // 背景图表中以 y1 作为 y 轴
        scales={{x: timeScale}}
        data={data}
        start={ds.state.start}
        end={ds.state.end}
        backgroundChart={{type: 'line'}}
        onChange={({startValue, endValue}: any) => {
          ds.setState('start', startValue);
          ds.setState('end', endValue);
        }}
      />
    );

    return (
      <div className={styles.timelineChart} style={{height: height + 30}}>
        <div>
          {title && <h4>{title}</h4>}
          <Chart height={height} padding={padding} data={dv} scale={scaleProps} forceFit>
            <Axis name="x"/>
            <Tooltip />
            {/* 以数据集中的 key 字段作为分类属性 */}
            <Legend name="key" position="top" />
            {/* 以数据集中的 x 和 value 字段作为 x 轴和 y 轴属性 */}
            <Geom type="line" position="x*value"  size={borderWidth} color="key" />
          </Chart>
        </div>
        <div style={{marginRight: '-20px', marginTop: '-5px'}}>
          <SliderGen/>
        </div>
      </div>
    )
  }
}

export default TimelineChart;