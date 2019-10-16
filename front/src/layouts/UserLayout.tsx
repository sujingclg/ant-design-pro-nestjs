import React from 'react';
import {Icon} from 'antd';
import {connect} from 'dva';
import Link from 'umi/link';
import {formatMessage} from 'umi-plugin-locale';
import DocumentTitle from 'react-document-title';
import GlobalFooter, {LinkType} from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import {BreadcrumbNameMapType, Route, RouterTypes} from '@/components/typings';
import defaultSettings from '@/defaultSettings';
import getPageTitle from '@/utils/getPageTitle';
import styles from './UserLayout.less';
import logo from '@/assets/logo.svg';
import {ConnectState, Dispatch} from '@/models/connect';

const copyright = (
  <React.Fragment>
    {/*Copyright <Icon type="copyright"/> 2019 中国航发商用航空发动机有限责任公司材料工艺部出品*/}
    Copyright <Icon type='copyright'/> 2019 Created by Sujing
  </React.Fragment>
);

interface UserLayoutProps
  extends
    Partial<RouterTypes<Route>> {
  dispatch: Dispatch;
  breadcrumbNameMap: BreadcrumbNameMapType;
}

interface UserLayoutState {
  links: LinkType[];
}

class UserLayout extends React.Component<UserLayoutProps, UserLayoutState> {
  readonly state: Readonly<UserLayoutState>;

  constructor(props: UserLayoutProps) {
    super(props);
    this.state = {
      links: [],
    };
  }

  componentDidMount() {
    this.setState({
      links: [
        {
          key: 'help',
          title: formatMessage({id: 'layout.user.link.help'}),
          href: '',
        },
        {
          key: 'privacy',
          title: formatMessage({id: 'layout.user.link.privacy'}),
          href: '',
        },
        {
          key: 'terms',
          title: formatMessage({id: 'layout.user.link.terms'}),
          href: 'http://www.baidu.com',
          isBlankTarget: true,
        },
      ],
    });
    const {
      dispatch,
      route,
    } = this.props;
    if (!route) { return; }
    const {routes, authority} = route;
    dispatch({
      type: 'menu/getMenuData',
      payload: {routes, authority},
    });
  }

  render() {
    const {
      children,
      location,
      breadcrumbNameMap,
    } = this.props;

    return (
      <DocumentTitle title={getPageTitle(location!.pathname, breadcrumbNameMap)}>
        <div className={styles.container}>
          <div className={styles.lang} >
            <SelectLang/>
          </div>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to='/'>
                  <img alt='logo' className={styles.logo} src={logo}/>
                  <span className={styles.title}>{defaultSettings.title}</span>
                </Link>
              </div>
              <div className={styles.desc}>Some descriptions here.</div>
            </div>
            {children}
          </div>
          <GlobalFooter copyright={copyright} links={this.state.links}/>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({menu: menuModel}: ConnectState) => ({
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
