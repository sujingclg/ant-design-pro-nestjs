import React from 'react';
import {Layout} from 'antd';
import router from 'umi/router';
import {connect} from 'dva';
import TopNavHeader, {TopNavHeaderProps} from '@/components/TopNavHeader';
import GlobalHeader, {GlobalHeaderProps} from '@/components/GlobalHeader';
import logo from '@/assets/logo.svg';
import {ConnectState, Dispatch} from '@/models/connect';

const {Header} = Layout;

function mapStateToProps(state: ConnectState): Partial<HeaderViewProps> {
  return {};
}

interface HeaderViewProps
  extends
    Partial<TopNavHeaderProps>,
    Partial<GlobalHeaderProps> {
  isTopMenu: boolean;
  isMobile?: boolean;
  dispatch: Dispatch;
}

class HeaderView extends React.Component<HeaderViewProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: HeaderViewProps) {
    super(props);
    this.state = {};
  }

  handleLogout = (): void => {
    const {dispatch} = this.props;
    dispatch({
      type: 'login/logout',
    });
  }

  render() {
    const {
      menuData,
      isTopMenu,
      isMobile,
      onCollapse,
      ...restProps
    } = this.props;
    return (
      <Header style={{padding: '0'}}>
        {isTopMenu && !isMobile ? (
          <TopNavHeader
            {...restProps}
            menuData={menuData!}
            logo={logo}
            title={'Three.js'}
            theme='dark'
            onLogout={this.handleLogout}
          />
        ) : (
          <GlobalHeader
            {...restProps}
            isMobile={isMobile}
            logo={logo}
            onCollapse={onCollapse}
            onLogout={this.handleLogout}
          />
        )}
      </Header>
    );
  }
}

export default connect(mapStateToProps)(HeaderView);
