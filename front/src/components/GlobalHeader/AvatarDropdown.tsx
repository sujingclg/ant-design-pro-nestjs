import React from "react";
import {Menu, Icon, Avatar} from "antd";
import classNames from "classnames";
import {FormattedMessage} from "umi-plugin-react/locale";
import {ClickParam} from "antd/lib/menu";
import router from "umi/router";
import HeaderDropdown from "../HeaderDropdown";
import {CurrentUserType} from "@/components/typings";
import styles from "./index.less";

export interface AvatarDropdownProps {
  onLogout: () => void;
  currentUser?: CurrentUserType;
  className?: string;
}

interface AvatarDropdownState {
}

class AvatarDropdown extends React.Component<AvatarDropdownProps, AvatarDropdownState> {
  readonly state: Readonly<AvatarDropdownState>;

  constructor(props: AvatarDropdownProps) {
    super(props);
    this.state = {};
  }

  onMenuClick = (event: ClickParam): void => {
    const {key} = event;
    if (key === "logout") {
      this.props.onLogout();
      return;
    }
    router.push(`/account/${key}`);
  }

  render() {
    const {
      currentUser,
      className,
    } = this.props;

    const menu = (
      <Menu className={styles.menu}
            // style={{minWidth: '160px', backgroundColor: "#ce1"}}
            onClick={this.onMenuClick} >
        <Menu.Item key="center">
          <Icon type="user"/>
          <FormattedMessage id="menu.account.center" defaultMessage="Account Center"/>
        </Menu.Item>
        <Menu.Item key="settings">
          <Icon type="setting"/>
          <FormattedMessage id="menu.account.settings" defaultMessage="Account Settings"/>
        </Menu.Item>
        {/*<Menu.Item key="admin">*/}
        {/*<Icon type="setting"/>*/}
        {/*<span>Administrator</span>*/}
        {/*</Menu.Item>*/}
        <Menu.Divider/>
        <Menu.Item key="logout">
          <Icon type="logout"/>
          <FormattedMessage id="menu.account.logout" defaultMessage="Logout"/>
        </Menu.Item>
      </Menu>
    );

    return (
      <HeaderDropdown overlay={menu}>
          <span
            className={classNames(className, styles.account)}
          >
            {
              currentUser && currentUser.avatar ? (
                <Avatar
                  size="small"
                  src={currentUser.avatar}
                  className={styles.avatar}
                  alt="avatar"
                />
              ) : (
                <Avatar
                  size="small"
                  icon="user"
                  className={styles.avatar}
                  alt="avatar"
                />)
            }
            <span className={styles.username}>{currentUser && currentUser.name ? currentUser.name : "User"}</span>
          </span>
      </HeaderDropdown>
    );
  }
}

export default AvatarDropdown;
