import React from "react";
import {Tabs} from "antd";


import LoginContext, {TabUtilType} from "./LoginContext";

const {TabPane} = Tabs;

const generateId = function () {
  let i = 0;
  return (prefix: string='') => {
    i += 1;
    return `${prefix}${i}`;
  }
}();

interface LoginTabProps {
  key?: string;
  tab?: React.ReactNode;
  tabUtil: TabUtilType;
}

class LoginTab extends React.Component<LoginTabProps, {}> {
  readonly state: Readonly<{}>;
  readonly uniqueId: string;

  constructor(props: LoginTabProps) {
    super(props);
    this.state = {};
    this.uniqueId = generateId('login-tab-')
  }

  componentDidMount() {
    const {tabUtil} = this.props;
    tabUtil.addTab(this.uniqueId);
  }

  render() {
    const {children} = this.props;
    return <TabPane {...this.props}>{children}</TabPane>
  }
}

interface WrappedLoginTabProps {
  key?: string;
  tab?: React.ReactNode;
}

const WrappedLoginTab: React.FC<WrappedLoginTabProps> & {typeName: string} = props => (
  <LoginContext.Consumer>
    {(value) => <LoginTab tabUtil={value.tabUtil!} {...props} />}
  </LoginContext.Consumer>
);

// 标志位, 用来判断是不是自定义组件
WrappedLoginTab.typeName = 'LoginTab';

export default WrappedLoginTab;