import React from "react";
import classNames from "classnames";
import {Button} from "antd";
// import * as H from "history";
import Link from "umi/link";
import typeConfig from "./typeConfig";
import styles from "./index.less";

interface ExceptionProps {
  type?: keyof typeof typeConfig;
  title?: React.ReactNode;
  desc?: React.ReactNode;
  img?: string;
  actions?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  backText?: string;
  redirect?: string;
}

const Exception: React.FC<ExceptionProps> = (props => {
  const {
    type,
    title,
    desc,
    img,
    actions,
    className,
    backText = "返回首页",
    redirect = "/",
    ...restProps
  } = props;
  const pageType = (type && type in typeConfig) ? type : "404";
  return (
    <div className={classNames(styles.exception, className)} {...restProps}>
      <div className={styles.imgBlock}>
        <div
          className={styles.imgElm}
          style={{backgroundImage: `url(${img || typeConfig[pageType].img})`}}
        />
      </div>
      <div className={styles.content}>
        <h1>{title || typeConfig[pageType].title}</h1>
        <div className={styles.desc}>{desc || typeConfig[pageType].desc}</div>
        <div className={styles.actions}>
          {actions || React.createElement(
            Link,
            {
              to: redirect!,
              href: redirect,
            },
            <Button type="primary">{backText}</Button>,
          )}
        </div>
      </div>
    </div>
  );
});

export default Exception;
