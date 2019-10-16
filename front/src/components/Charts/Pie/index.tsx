import React from "react";
import {Chart, ChartProps} from "bizcharts";
import classNames from "classnames";
import styles from "./index.less";


export interface PieProps {
  data: {x: string; y: number}[];
  height: number;
  title: React.ReactNode;
  color?: string;
  colors?: string[];
  padding?: ChartProps['padding'];
  percent?: number;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  style?: React.CSSProperties;
}

interface PieState {
  height: number;
  legendData: [];
  legendBlock: boolean;
}

class Pie extends React.Component<PieProps, PieState> {

  readonly state: Readonly<PieState>;

  private _chart?: any;

  constructor(props: PieProps) {
    super(props);
    this.state = {
      height: 0,
      legendData: [],
      legendBlock: false,
    };
  }

  componentDidUpdate(prevProps: PieProps) {
    const {data} = this.props;
    if (data != prevProps.data) {
      this.getLegendData();
    }
  }

  getLegendData = () => {
    if (!this._chart) return;
  };

  render() {
    const classString = classNames();
    return (
      <div className={classString}>
      </div>
    )
  }
}

export default Pie;