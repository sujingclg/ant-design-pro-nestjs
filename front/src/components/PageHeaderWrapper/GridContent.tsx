import React from "react";
import classNames from "classnames";
import RouteContext from "../RouteContext";
import {Settings} from "@/defaultSettings";
import styles from "./GridContent.less";


interface GridContentProps {
  contentWidth?: Settings['contentWidth'];
}

const GridContent: React.FC<GridContentProps> = (props => {
  const {children, contentWidth: propsContentWidth} = props;
  return (
    <RouteContext.Consumer>
      {value => {
        const contentWidth = propsContentWidth || value.contentWidth;
        let className = styles.main;
        if (contentWidth == 'Fixed') {
          className = classNames(styles.main, styles.wide);
        }
        return <div className={className}>{children}</div>;
      }}
    </RouteContext.Consumer>
  )
});

export default GridContent;