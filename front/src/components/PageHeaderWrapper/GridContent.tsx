import React from "react";
import classNames from "classnames";
import RouteContext from "../RouteContext";
import {Settings} from "@/defaultSettings";
import styles from "./GridContent.less";


interface GridContentProps {
  CSSLayoutType?: Settings['CSSLayoutType'];
}

const GridContent: React.FC<GridContentProps> = (props => {
  const {children, CSSLayoutType: propsCSSLayoutType} = props;
  return (
    <RouteContext.Consumer>
      {value => {
        const contentWidth = propsCSSLayoutType || value.CSSLayoutType;
        let clsString = styles.main;
        if (contentWidth == 'Fixed') {
          clsString = classNames(styles.main, styles.wide);
        }
        return <div className={clsString}>{children}</div>;
      }}
    </RouteContext.Consumer>
  )
});

export default GridContent;