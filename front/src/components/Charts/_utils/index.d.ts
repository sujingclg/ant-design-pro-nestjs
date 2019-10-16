import React from "react";

export interface SliderProps {
  width?: number | 'auto';
  height: number;
  padding?:
    | string
    | {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
    | number
    | [number, number, number, number]
    | [string, string];
  data: any;
  scales?: any;
  xAxis?: string;
  yAxis?: string;
  start?: any;
  end?: any;
  backgroundChart?: any;
  onChange?: Function;
  className?: string;
  style?: React.CSSProperties;
}

export class Slider extends React.Component<SliderProps, any> {}

declare class DataSet {
  constructor(initialProps: {
    state: {
      start: number;
      end: number;
    }
  });
  state: {start: number; end: number};
  setState: (name: string, value: any) => void;
  createView: (name?: string, options?: any) => View;
}

declare class View {
  source: (source: any, options?: any) => View;
  transform: (options: {
    type: string,
    callback?: (row: any) => any,
    [key: string]: any,
  }) => View;
}