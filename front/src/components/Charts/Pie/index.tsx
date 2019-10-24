import React from "react";
import {Chart, ChartProps, Tooltip, Geom, Coord} from "bizcharts";
import classNames from "classnames";
import {DataView} from '../_utils';
import styles from "./index.less";
import {Data} from "unist";

export interface PieProps {
  data: {x: string; y: number}[];
  height: number;
  innerRadius: number;
  title?: React.ReactNode;
  // color?: string;
  // colors?: string[];
  // padding?: ChartProps['padding'];
  // percent?: number;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  hasLegend: boolean;
  subTitle: string;
  valueFormat: React.ReactNode;
  lineWidth: number
  className?: string;
  style?: React.CSSProperties;
}

interface PieState {
  height: number;
  legendData: [];
  legendBlock: boolean;
}

class Pie extends React.Component<PieProps, PieState> {

  private readonly rootRef: React.RefObject<HTMLDivElement>;
  static defaultProps = {
    innerRadius: 0.75,
    hasLegend: false,
  };
  readonly state: Readonly<PieState>;

  constructor(props: PieProps) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      height: 0,
      legendData: [],
      legendBlock: false,
    };
  }

  componentDidUpdate(prevProps: PieProps) {}

  render() {
    const {
      height,
      innerRadius,
      hasLegend,
      className,
    } = this.props;
    const {legendBlock} = this.state;
    // const clsString = classNames(styles.main, className, {
    //   [styles.hasLegend]: hasLegend,
    //   [styles.legendBlock]: legendBlock,
    // });
    const data = [
      {
        type: "分类一",
        value: 20
      },
      {
        type: "分类二",
        value: 18
      },
      {
        type: "分类三",
        value: 32
      },
      {
        type: "分类四",
        value: 15
      },
      {
        type: "Other",
        value: 15
      }
    ];
    const dv = new DataView();
    // dv.source(data)

    return (
      <div ref={this.rootRef}>
        <Chart height={height} data={data} forceFit>
          <Coord type="theta" innerRadius={innerRadius} />
          <Tooltip showTitle={false} />
          <Geom
            type="intervalStack"
            position="value"
            color="type"
            shape="sliceShape"
          />
        </Chart>
      </div>
    )
  }
}

export default Pie;
