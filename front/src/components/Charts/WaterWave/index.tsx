import React from "react";
import autoHeight from "../autoHeight";
import styles from "./index.less";

interface WaterWaveProps {
  height?: number;
}

interface WaterWaveState {}

@autoHeight()
class WaterWave extends React.Component<WaterWaveProps, WaterWaveState> {

  private readonly _root: React.RefObject<HTMLDivElement>;
  private readonly _node: React.RefObject<HTMLCanvasElement>;

  readonly state: Readonly<WaterWaveState>;

  constructor(props: WaterWaveProps) {
    super(props);
    this._root = React.createRef();
    this._node = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    if (!this._node.current) return;
    const canvas = this._node.current;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(10, 10, 55, 50);
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect (30, 30, 55, 50);

  }

  renderChart(type?: 'update') {
    if (!this._node.current) return;
    const canvas = this._node.current;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = canvas.width, canvasHeight =  canvas.height;
    const radius = canvasWidth / 2;

    const lineWidth = 2;
    const cR = radius - lineWidth;

    ctx.beginPath();
    ctx.lineWidth = lineWidth * 2;

    function drawSin() {

    }

    (function render() {

    }());
  }

  render() {
    const {height} = this.props;
    console.log(height);
    return (
      <div ref={this._root} className={styles.waterWave}>
        <div style={{height, width: height, overflow: 'hidden'}}>
          <canvas
            ref={this._node}
            width={height! * 2}
            height={height! * 2}
          >浏览器不支持canvas</canvas>
        </div>
      </div>
    )
  }
}

export default WaterWave;