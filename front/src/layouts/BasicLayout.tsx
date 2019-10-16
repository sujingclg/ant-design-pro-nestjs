import React from "react";
import classNames from "classnames";
import {Layout} from "antd";
import {connect} from "dva";
import DocumentTitle from "react-document-title";
import {ContainerQuery} from "react-container-query";
import getPageTitle from "@/utils/getPageTitle";
import defaultSettings, {Settings} from "@/defaultSettings";
import SiderMenu from "@/components/SiderMenu";
import RouteContext, {RouteContextType} from "@/components/RouteContext";
import {ConnectState, Dispatch} from "@/models/connect";
import logo from "@/assets/logo.svg";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./BasicLayout.less";

import {
  MenuDataItemType,
  MessageDescriptor,
  Route,
  RouterTypes,
  WithFalse,
  BreadcrumbNameMapType,
} from "@/components/typings";

const {Content} = Layout;

const query = {
  'screen-xs': {maxWidth: 575},
  'screen-sm': {minWidth: 576, maxWidth: 767},
  'screen-md': {minWidth: 768, maxWidth: 991},
  'screen-lg': {minWidth: 992, maxWidth: 1199},
  'screen-xl': {minWidth: 1200, maxWidth: 1599},
  'screen-xxl': {minWidth: 1600},
};

function mapStateToProps({global, setting, menu: menuModel}: ConnectState): Partial<BasicLayoutProps> {
  return {
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap,
    collapsed: global.collapsed,
  };
}

interface BasicLayoutProps
  extends Partial<RouterTypes<Route>>,
    Partial<Settings> {
  menuData: MenuDataItemType[];
  dispatch: Dispatch;
  breadcrumbNameMap: BreadcrumbNameMapType;
  collapsed: boolean;
}

class BasicLayout extends React.Component<BasicLayoutProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: BasicLayoutProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      dispatch,
      route,
    } = this.props;
    if (!route) return;
    const {routes, path, authority} = route;
    dispatch({
      type: 'user/fetchCurrentUser',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: {routes, authority, path},
    });
  }

  getContext(): RouteContextType {
    const {location, breadcrumbNameMap} = this.props;
    return {
      location,
      breadcrumbNameMap
    }
  };

  handleMenuCollapse: (collapsed: boolean) => void = (collapsed) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    })
  };

  render() {
    const {
      location,
      children,
      collapsed,
      breadcrumbNameMap,
    } = this.props;
    const {pathname} = location!;

    //TODO 查 react-media-hook2
    // const isMobile = useMedia({
    //   id: 'BasicLayout',
    //   query: '(max-width: 599px)',
    // })[0];
    const isMobile = false;

    const isTopMenu = false;
    // const isTopMenu = true;
    const layout = (
      <Layout>
        {isTopMenu ? null : (
          <SiderMenu
            {...this.props}
            isMobile={isMobile}
            logo={logo}
            title={defaultSettings.title}
            collapsed={collapsed}
            onCollapse={this.handleMenuCollapse}
          />
        )}
        <Layout style={{minHeight: '100vh'}} className={styles.layout}>
          <Header
            {...this.props}
            isTopMenu={isTopMenu}
            isMobile={isMobile}
            onCollapse={this.handleMenuCollapse}
          />
          <Content className={styles.content}>
            {children}
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    );

    return (
      <React.Fragment>
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <RouteContext.Provider value={{...this.getContext(), contentWidth: isTopMenu ? 'Fixed' : 'Fluid'}}>
                <div className={classNames(params)}>{layout}</div>
              </RouteContext.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps)(BasicLayout);