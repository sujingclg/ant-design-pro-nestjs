import React from "react";
import {Card} from "antd";
import {CardProps} from "antd/lib/card";
import classNames from "classnames";
import {WithFalse} from "../../typings";
import styles from "./index.less";


function renderTotal(total?: React.ReactNode | number | Function): React.ReactNode {
  let totalDom;
  switch (typeof total) {
    case 'undefined':
      totalDom = null;
      break;
    case 'function':
      totalDom = <div className={styles.total}>{total()}</div>;
      break;
    default:
      totalDom = <div className={styles.total}>{total}</div>;
  }
  return totalDom;
}


export interface ChartCardProps extends Partial<CardProps>{
  title: React.ReactNode;  // 左上角的标题
  avatar?: React.ReactNode;
  action?: React.ReactNode;  // 右上角的提示图标
  total: React.ReactNode | number | (() => React.ReactNode | number);  // 醒目显示的总数
  footer?: React.ReactNode;  // 图表下方的提示栏
  contentHeight?: number;  // ChartCard 内包含的图表组件的高度
  loading?: boolean;
  style?: React.CSSProperties;
}

class ChartCard extends React.Component<ChartCardProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: ChartCardProps) {
    super(props);
    this.state = {};
  }

  renderContent(): WithFalse<React.ReactNode> {
    const {
      title,
      avatar,
      action,
      total,
      footer,
      loading,
      contentHeight,
      children,
    } = this.props;
    if (loading) {
      return false;
    }
    return (
      <div className={styles.chartCard}>
        <div className={classNames(styles.chartTop,
          {[styles.chartTopMargin]: !children && !footer}  // 当 children 和 footer 都不存在时应用此样式
          )}
        >
          <div className={styles.avatar}>{avatar}</div>
          <div className={styles.metaWrap}>
            <div className={styles.meta}>
              <span className={styles.title}>{title}</span>
              <span className={styles.action}>{action}</span>
            </div>
            {renderTotal(total)}
          </div>
        </div>
        {children && (
          <div className={styles.content} style={{height: contentHeight || 'auto'}}>
            <div className={contentHeight && styles.contentFixed}>{children}</div>
          </div>
        )}
        {footer && (
          <div className={classNames(styles.footer,
            {[styles.footerMargin]: !children}  // 当 children 和 footer 都不存在时应用此样式
            )}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }

  render() {
    const {
      title,
      avatar,
      action,
      total,
      footer,
      loading,
      contentHeight,
      children,
      ...restProps
    } = this.props;
    return (

        <Card
          loading={loading}
          bodyStyle={{padding: '20px 24px 8px 24px'}}
          {...restProps}
        >
          {this.renderContent()}
        </Card>
    )
  }
}

export default ChartCard;