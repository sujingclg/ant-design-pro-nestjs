import React from "react";
import {Menu, Icon} from "antd";
import {formatMessage, setLocale, getLocale} from "umi-plugin-react/locale";
import classNames from "classnames";
import styles from "./index.less";
import HeaderDropdown from "../HeaderDropdown";

interface SelectLangProps {
  className?: string;
  style?: React.CSSProperties;
}

class SelectLang extends React.Component<SelectLangProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: SelectLangProps) {
    super(props);
    this.state = {};
  }

  changeLang: (({key}: {key: string}) => void) = ({key}) => {
    setLocale(key, true);
  };

  render() {
    const {className} = this.props;
    const selectedLang = getLocale();
    const languageIcons = {
      'zh-CN': '🇨🇳',
      'zh-TW': '🇭🇰',
      'en-US': '🇬🇧',
      'pt-BR': '🇧🇷',
    };

    const locales: {key: string; label: string; icon: string}[] = [
      {
        key: 'zh-CN',
        label: '简体中文',
        icon: '🇨🇳'
      },
      {
        key: 'en-US',
        label: 'English',
        icon: '🇬🇧'
      },
    ];

    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={this.changeLang}>
        {
          locales.map(locale => (
            <Menu.Item key={locale.key}>
              {/* role aria-label这两个属性用于为辅助设备(如屏幕阅读器)提供相应标识 */}
              <span role="img" aria-label={locale.label}>
                {locale.icon}
              </span>
              {` ${locale.label}`}
            </Menu.Item>
          ))
        }
      </Menu>
    );

    return (
      <HeaderDropdown overlay={langMenu}>
        <span className={classNames(styles.dropDown, className)}>
          <Icon type="global" title={formatMessage({id: 'navBar.lang'})}/>
        </span>
      </HeaderDropdown>
    )
  }
}

export default SelectLang;