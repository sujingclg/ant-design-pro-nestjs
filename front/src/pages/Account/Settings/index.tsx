import React from "react";
import {Menu} from "antd";
import {FormattedMessage} from "umi-plugin-react/locale"
import GridContent from "@/components/PageHeaderWrapper/GridContent";
import BaseView from "./BaseView";
import SecurityView from "./SecurityView";
import styles from "./index.less";

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

  private readonly rootRef: React.RefObject<HTMLDivElement>;

  readonly state: Readonly<SettingsState>;

  constructor(props: SettingsProps) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      menuMode: 'inline',
      selectedMenuKey: 'base',
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    if (!this.rootRef.current) { return }
    requestAnimationFrame(() => {
      if (!this.rootRef.current) { return }
      let menuMode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = this.rootRef.current;  // offsetWidth 水平方向 width + 左右padding + 左右border-width
      if (window.innerWidth < 768 && offsetWidth > 400) {
        menuMode = 'horizontal';
      }
      this.setState({
        menuMode,
      });
    });
  };

  getMenuItem(): React.ReactNode[] {
    return Object.keys(menuMap).map(item => (
      <Menu.Item key={item}>{menuMap[item as keyof typeof menuMap]}</Menu.Item>
    ));
  }

  handleMenuClick = ({key}:{key: any}) => {
    this.setState({
      selectedMenuKey: key,
    })
  };

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

  render() {
    const {menuMode, selectedMenuKey} = this.state;
    return (
        <GridContent>
          <div className={styles.main} ref={this.rootRef}>
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
