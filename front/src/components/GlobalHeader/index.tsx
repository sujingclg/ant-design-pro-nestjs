import React from 'react';
import {Icon} from 'antd';
import Link from 'umi/link';
import RightContent, {RightContentProps} from './RightContent';
import styles from './index.less';

export interface GlobalHeaderProps extends Partial<RightContentProps> {
  collapsed?: boolean;
  isMobile?: boolean;
  logo?: string;
  onCollapse?: (collapsed: boolean) => void;
}

class GlobalHeader extends React.Component<GlobalHeaderProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: GlobalHeaderProps) {
    super(props);
    this.state = {};
  }

  toggle: () => void  = () => {
    const {onCollapse, collapsed} = this.props;
    if (onCollapse) {
      onCollapse(!collapsed);
    }
  };

  render() {
    const {collapsed, isMobile, logo} = this.props;
    return (
      <div className={styles.header}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <span className={styles.trigger} onClick={this.toggle}>
          <Icon type={collapsed ? "menu-unfold" : "menu-fold"}/>
        </span>
        <RightContent {...this.props}/>
      </div>
    );
  }
}

export default GlobalHeader;
