import React from "react";
import {Tooltip} from "antd";
import styles from "./index.less";


export interface MiniProgressProps {
  target: number;
  targetLabel: string;
  color?: string;
  strokeWidth?: number;
  percent?: number;
  style?: React.CSSProperties;
}

const MiniProgress: React.FC<MiniProgressProps> = (props => {
  const {
    target,
    targetLabel,
    // color = 'rgb(19, 194, 194)',
    color,
    strokeWidth,
    percent,
  } = props;

  return (
    <div className={styles.miniProgress}>
      <Tooltip title={targetLabel}>
        <div
          className={styles.target}
          style={{left: `${target}%` || ''}}
        >
          {/*此为目标值处上下两个标线元素*/}
          <span style={{backgroundColor: color}} />
          <span style={{backgroundColor: color}} />
        </div>
      </Tooltip>
      <div className={styles.progressWrap}>
        <div
          className={styles.progress}
          style={{
            backgroundColor: color,
            width: `${percent}%` || '',  // 由于 div 中没有元素, 因此需同时指定 width 和 height 以使其显示出来
            height: strokeWidth || '',
          }}
        />
      </div>
    </div>
  )
});

export default MiniProgress;