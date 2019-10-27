import React, {memo} from "react";
import classNames from "classnames";
import {Row} from "antd";
import Description, {DescriptionProps} from "./Description";
import styles from "./index.less";

interface DescriptionListProps {
  title?: React.ReactNode
  colNum: DescriptionProps['colNum'];  // 默认宽度下的列数
  layout: 'horizontal' | 'vertical';
  size?: 'large' | 'small';
  gutter: number;
  className?: string;
  style?: React.CSSProperties;
}

class DescriptionList extends React.PureComponent<DescriptionListProps, {}> {

  // readonly state: Readonly<{}>;
  // constructor(props: DescriptionListProps) {
  //   super(props);
  //   this.state = {};
  // }

  static readonly Description = Description;
  static readonly defaultProps = {
    colNum: 3,
    layout: 'horizontal',
    gutter: 32,
  };

  render() {
    const {
      title,
      colNum,
      layout,
      size,
      gutter,
      className,
      children,
      ...restProps
    } = this.props;
    const clsString = classNames(styles.descriptionList, styles[layout], className, {
      [styles.small]: size == 'small',
      [styles.large]: size == 'large',
    });
    return (
      <div className={clsString} {...restProps}>
        {title && <div className={styles.title}>{title}</div>}
        <Row gutter={gutter}>
          {React.Children.map(children, child => (
            child ? React.cloneElement(child as any, {colNum}) : child
          ))}
        </Row>
      </div>
    )
  }
}

export default DescriptionList;
