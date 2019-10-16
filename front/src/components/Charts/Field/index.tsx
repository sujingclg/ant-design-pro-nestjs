import React from "react";
import styles from "./index.less";


export interface FieldProps {
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
}

const Field: React.FC<FieldProps> = (props => {
  const {label, value, ...restProps} = props;
  return (
    <div className={styles.field} {...restProps}>
      <span className={styles.label}>{label}</span>
      <span className={styles.number}>{value}</span>
    </div>
  )
});

export default Field;