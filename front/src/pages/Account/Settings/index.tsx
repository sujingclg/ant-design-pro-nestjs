import React from "react";
import {Menu} from "antd";
import {FormattedMessage} from "umi-plugin-react/locale"
import GridContent from "@/components/PageHeaderWrapper/GridContent";
import styles from "./index.less";
import BaseView from "./BaseView";
import SecurityView from "./SecurityView";
import {SiderMenuProps} from '@/components/SiderMenu/SiderMenu';


const menuMap = {
  base: <FormattedMessage id="account.settings.menuMap.basic" defaultMessage="Basic Settings"/>,
  security: <FormattedMessage id="account.settings.menuMap.security" defaultMessage="Security Settings"/>,
};

interface SettingsProps {}

interface SettingsState {
  menuMode: 'inline' | 'horizontal';
  selectedMenuKey: keyof typeof menuMap;
}

class Settings extends React.Component<SettingsProps, SettingsState> {

  readonly state: Readonly<SettingsState>;

  constructor(props: SettingsProps) {
    super(props);
    this.state = {
      menuMode: 'inline',
      selectedMenuKey: 'base',
    };
  }

  static getDerivedStateFromProps(nextProps: SettingsProps, prevState: SettingsState): SettingsState | null {
    console.log('call getDerivedStateFromProps');
    console.log(nextProps);
    return null;
  }

  componentDidMount() {
    // this.setState({
    //   menuMode: "horizontal"
    // });
  }

  getMenuItem(): React.ReactNode[] {
    return Object.keys(menuMap).map(item => (
      <Menu.Item key={item}>{menuMap[item as keyof typeof menuMap]}</Menu.Item>
    ));
  }


  renderChildren(): React.ReactNode {
    const {selectedMenuKey} = this.state;
    switch (selectedMenuKey) {
      case 'base':
        return <BaseView/>;
      case 'security':
        return <SecurityView/>;
      default:
        break;
    }
    return null;
  }

  handleMenuClick = ({key}:{key: any}) => {
    this.setState({
      selectedMenuKey: key,
    })
  };

  render() {
    const {menuMode, selectedMenuKey} = this.state;
    return (
        <GridContent>
          <div className={styles.main}>
            <div className={styles.leftMenu}>
              <Menu mode={menuMode} selectedKeys={[selectedMenuKey]} onClick={this.handleMenuClick}>
                {this.getMenuItem()}
              </Menu>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{menuMap[selectedMenuKey]}</div>
              {this.renderChildren()}
            </div>
          </div>
        </GridContent>
    )
  }
}

export default Settings;