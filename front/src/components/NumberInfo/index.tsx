import React from "react";
import {Icon} from 'antd';
import classNames from 'classnames';
import styles from './index.less';

interface NumberInfoProps {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  gap?: number;
  total: React.ReactNode;
  suffix?: React.ReactNode;
  status?: 'up' | 'down';
  subTotal?: number;
  style?: React.CSSProperties;
  theme?: 'light' | 'black';
}

const NumberInfo: React.FC<NumberInfoProps> = (props => {
  const {title, subTitle, gap, theme, total, suffix, status, subTotal} = props;
  return (
    <div className={classNames(styles.main, {[styles.light]: theme === 'light'})}>
      {title && (
        <div className={styles.title}>{title}</div>
      )}
      {subTitle && (
        <div className={styles.subTitle}>{subTitle}</div>
      )}
      <div className={styles.value} style={gap ? {marginTop: gap} : undefined}>
        <span>
          {total}
          {suffix && <em className={styles.suffix}>{suffix}</em>}
        </span>
        {(status || subTotal) && (
          <span className={styles.subTotal}>
            {subTotal}
            {status && <Icon type={`caret-${status}`}/>}
          </span>
        )}
      </div>
    </div>
  )
});

export default NumberInfo;
