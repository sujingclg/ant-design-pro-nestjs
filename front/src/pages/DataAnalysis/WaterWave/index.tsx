import React from "react";
import styles from "./index.less";


interface WaterWaveProps {
  sideLength: number;
  className?: string;
  style?: React.CSSProperties;
}

interface WaterWaveState {}

class WaterWave extends React.Component<WaterWaveProps, WaterWaveState> {

  private readonly _rootRef: React.RefObject<HTMLDivElement>;
  private readonly _canvasContainerRef: React.RefObject<HTMLCanvasElement>;

  readonly state: Readonly<WaterWaveState>;

  constructor(props: WaterWaveProps) {
    super(props);
    this._rootRef = React.createRef();
    this._canvasContainerRef = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    if (!this._canvasContainerRef.current) return;
    const canvas = this._canvasContainerRef.current;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

  }

  render() {
    const {sideLength} = this.props;
    return (
      <div ref={this._rootRef} className={styles.waterWave}>
        <div style={{height: sideLength, width: sideLength, overflow: 'hidden'}}>
          <canvas
            ref={this._canvasContainerRef}
            width={sideLength * 2}
            height={sideLength * 2}
          >浏览器不支持canvas</canvas>
        </div>
      </div>
    )
  }
}

export default WaterWave;