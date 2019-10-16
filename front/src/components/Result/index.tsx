import React from "react";
import classNames from "classnames";
import {Icon} from "antd";
import styles from "./index.less";


interface ResultProps {
  type: "success" | "error";
  title: string;
  description?: string;
  extra?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Result: React.FC<ResultProps> = (props => {
  const iconMap = {
    success: <Icon className={styles.success} type="check-circle" theme="filled"/>,
    error: <Icon className={styles.error} type="close-circle" theme="filled"/>,
  };
  const {type, title, description, extra, actions, className, ...restProps} = props;
  return (
    <div className={classNames(styles.result, className)} {...restProps}>
      <div className={styles.icon}>{iconMap[type]}</div>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      {extra && <div className={styles.extra}>{extra}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
});

export default Result;