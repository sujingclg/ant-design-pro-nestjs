import React, {memo} from "react";
import {Col} from "antd";
import styles from "./index.less";

const responsive = {
  1: {xs: 24},
  2: {xs: 24, sm: 12},
  3: {xs: 24, sm: 12, md: 8},
  4: {xs: 24, sm: 12, md: 6},
};

export interface DescriptionProps {
  term?: React.ReactNode;
  colNum?: keyof typeof responsive;
  style?: React.CSSProperties;
}

const Description: React.FC<DescriptionProps> = memo((
  {
    term,
    colNum,
    children,
    ...restProps
  }) => {
  return (
    <Col {...responsive[colNum!]} {...restProps}>
      {term && <div className={styles.term}>{term}</div>}
      {children !== null && children !== undefined && <div className={styles.detail}>{children}</div>}
    </Col>
  )
});

export default Description;
