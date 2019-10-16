import React from "react";
import {Col} from "antd";
import responsive from "./responsive";
import styles from "./index.less";

export interface DescriptionProps {
  term?: React.ReactNode;
  colNum?: keyof typeof responsive;
  style?: React.CSSProperties;
}

const Description: React.FC<DescriptionProps> = (props => {
  const {term, colNum, children, ...restProps} = props;
  return (
    <Col {...responsive[colNum!]} {...restProps}>
      {term && <div className={styles.term}>{term}</div>}
      {children != null && children != undefined && <div className={styles.detail}>{children}</div>}
    </Col>
  )
});

export default Description;