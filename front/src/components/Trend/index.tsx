import React from "react";
import {Icon} from "antd";
import classNames from "classnames";
import styles from "./index.less";


interface TrendProps {
  flag: 'up' | 'down';
  colorful?: boolean;
  reverseColor?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Trend: React.FC<TrendProps> = (props => {
  const {
    flag,
    colorful = true,
    reverseColor = false,
    className,
    children,
    ...restProps  // 用于获取 style 属性给 div 元素
  } = props;

  const classString = classNames(
    styles.trendItem,
    {
      [styles.trendItemGrey]: !colorful,
      [styles.reverseColor]: reverseColor && colorful,
    },
    className
  );

  return (
    <div
      {...restProps} className={classString}
      title={typeof children == 'string' ? children : ''}
    >
      <div className={styles.text}>
        <span>{children}</span>
      </div>
      {flag && (
        <div className={styles.flag}>
          <span className={styles[flag]}>  {/* flag 为 up 或 down */}
            <Icon type={`caret-${flag}`} />
          </span>
        </div>
      )}
    </div>
  )
});

export default Trend;