import React from "react";
import {Chart, ChartProps, Axis, Tooltip, Geom} from "bizcharts";
import styles from "./index.less";

export interface BarProps {
  data: {x: string; y: number}[];
  height: number;
  title: React.ReactNode;
  color: string;
  padding: ChartProps['padding'];
  autoLabel?: boolean;
  style?: React.CSSProperties;
}

interface BarState {
  height: number;
  autoHideXLabels: boolean;
}

class Bar extends React.Component<BarProps, BarState> {

  static defaultProps = {
    color: 'rgba(24, 144, 255, 0.85)',
    padding: 'auto',
  };
  readonly state: Readonly<BarState>;

  constructor(props: BarProps) {
    super(props);
    this.state = {
      height: 0,
      autoHideXLabels: false,
    };
  }

  render() {
    const {
      data,
      height: propsHeight,
      title,
      color,
      padding,
    } = this.props;

    const {
      height: stateHeight,
      autoHideXLabels,
    } = this.state;

    const scaleProps = {
      x: {type: 'cat'},
      y: {min: 0},
    };

    const tooltip: [string, (...args: any[]) => {name?: string; value: string}] = [
      'x*y', (x, y) => ({name: x, value: y}),
    ];

    const height = propsHeight || stateHeight;

    return (
      <div className={styles.chart} style={{height}}>
        <div>
          {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
          <Chart
            height={title ? height - 41 : height}
            scale={scaleProps}
            forceFit={true}
            data={data}
            padding={padding}
          >
            <Axis // title 默认为关闭状态
              name="x"
              label={autoHideXLabels ? null : undefined}
              tickLine={autoHideXLabels ? null : undefined}  // 横坐标标签上面的刻度线
            />
            <Axis name="y" />
            <Tooltip showTitle={false} />
            <Geom type="interval" position="x*y" color={color} tooltip={tooltip} />
          </Chart>
        </div>
      </div>
    );
  }
}

export default Bar;
