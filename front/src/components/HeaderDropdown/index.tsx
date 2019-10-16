import React from "react";
import classNames from "classnames";
import {Dropdown} from "antd";
import {DropDownProps} from "antd/es/dropdown";
import styles from "./index.less";


interface HeaderDropDownProps extends DropDownProps {}

export default class HeaderDropdown extends React.Component<HeaderDropDownProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: HeaderDropDownProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {overlayClassName, ...restProps} = this.props;
    return (
      <Dropdown
        placement="bottomRight"
        overlayClassName={classNames(styles.container, overlayClassName)}
        {...restProps}
      />
    )
  }
}
