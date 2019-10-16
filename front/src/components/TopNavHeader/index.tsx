import React from "react";
import Link from "umi/link";
import styles from "./index.less";
import BaseMenu, {BaseMenuProps} from "../SiderMenu/BaseMenu";
import RightContent, {RightContentProps} from "../GlobalHeader/RightContent";

export interface TopNavHeaderProps extends BaseMenuProps, Partial<RightContentProps> {
  logo?: string;
  title?: string;
}

class TopNavHeader extends React.Component<TopNavHeaderProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: TopNavHeaderProps) {
    super(props);
    this.state = {};
  }

  // handleOpenChange: ((openKeys: string[]) => void) = (openKeys) => {};

  render(): React.ReactNode {
    const {
      logo,
      title,
      ...restProps
    } = this.props;
    return (
      <div className={styles.head}>
        <div className={styles.left}>
          {logo || title ? (
            <div className={styles.logo}>
              <Link to="/">
                {logo ? (
                  <img src={logo} alt="logo"/>
                ) : null}
                {title ? (
                  <h1>{title}</h1>
                ) : null}
              </Link>
            </div>
          ) : null}
          <BaseMenu
            {...restProps}
            mode="horizontal"
            className={styles["header-menu"]}
          />
        </div>
        <RightContent {...this.props}/>
      </div>
    );
  }
}

export default TopNavHeader;
