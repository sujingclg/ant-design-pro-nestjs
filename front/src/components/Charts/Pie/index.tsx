import React from "react";
import {Chart, ChartProps} from "bizcharts";
import classNames from "classnames";
import styles from "./index.less";

export interface PieProps {
  // data: {x: string; y: number}[];
  // height: number;
  innerRadius: number;
  // title: React.ReactNode;
  // color?: string;
  // colors?: string[];
  // padding?: ChartProps['padding'];
  // percent?: number;
  // total?: React.ReactNode | number | (() => React.ReactNode | number);
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
      innerRadius,
    } = this.props;
    const clsString = classNames();
    return (
      <div className={clsString} ref={this.rootRef}>
        {/*<Chart></Chart>*/}
        {innerRadius}
      </div>
    )
  }
}

export default Pie;
