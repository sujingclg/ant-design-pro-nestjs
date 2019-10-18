import React from 'react';
import {Form, Tabs} from 'antd';
import {FormComponentProps, ValidateCallback} from 'antd/lib/form';
import classNames from 'classnames';
import LoginItem, {LoginItemProps} from './LoginItem';
import LoginTab from './LoginTab';
import LoginSubmit from './LoginSubmit';
import LoginContext, {LoginContextType} from './LoginContext';
import styles from './index.less';

interface LoginProps extends FormComponentProps {
  className?: string;
  defaultActiveKey: string;
  style?: React.CSSProperties;
  onTabChange?: (key: string) => void;
  onSubmit?: ValidateCallback<{[key: string]: string}>;
}

interface LoginState {
  tabsIdList: string[];
  activeTabKey: string;  // 当前激活的Tab的名字
  tabsFieldsMap: {[activeKey: string]: string[]};  // 各个 tab 里的 Fields 的 id 列表
}

class Login extends React.Component<LoginProps, LoginState> {

  static Tab: typeof LoginTab;
  static Submit: typeof LoginSubmit;
  static Username: React.FC<LoginItemProps>;
  static Password: React.FC<LoginItemProps>;
  static Mobile: React.FC<LoginItemProps>;
  static Captcha: React.FC<LoginItemProps>;

  readonly state: Readonly<LoginState>;

  constructor(props: LoginProps) {
    super(props);
    this.state = {
      activeTabKey: props.defaultActiveKey,
      tabsIdList: [],
      tabsFieldsMap: {},
    };
  }

  getContext: (() => LoginContextType) = () => {
    const {tabsIdList} = this.state;
    const {form} = this.props;
    return {
      tabUtil: {
        addTab: (id: string) => {
          this.setState({
            tabsIdList: [...tabsIdList, id],
          });
        },
        removeTab: (id: string) => {
          this.setState({
            tabsIdList: tabsIdList.filter(currentId => currentId !== id),
          });
        },
      },
      form: {
        ...form,
      },
      updateActive: activeItemFieldId => {
        // activeTabKey, tabsFieldsMap 分别对应于源码中的 type, active
        const {activeTabKey, tabsFieldsMap} = this.state;
        if (tabsFieldsMap[activeTabKey]) {
          tabsFieldsMap[activeTabKey].push(activeItemFieldId);
        } else {
          tabsFieldsMap[activeTabKey] = [activeItemFieldId];
        }
        this.setState({
          tabsFieldsMap,
        });
      },
    };
  }

  onSwitch: ((activeKey: string) => void) = (activeKey) => {
    this.setState({
      activeTabKey: activeKey,
    });
    const {onTabChange} = this.props;
    if (onTabChange) {
      onTabChange(activeKey);
    }
  }

  /**
   * 仅对那些激活的 Fields 执行校验功能, validateFields 的 options.force 设置为 true 表示对已经校验过的表单域，
   * 在 validateTrigger 再次被触发时再次校验
   * @param event
   */
  handleSubmit: (event: React.FormEvent) => void = event => {
    event.preventDefault();
    // activeTabKey, tabsFieldsMap 分别对应于源码中的 type, active
    const {activeTabKey, tabsFieldsMap} = this.state;
    const {form, onSubmit} = this.props;
    const activeFields = tabsFieldsMap[activeTabKey];
    form.validateFields(activeFields, {force: true}, (errors, values) => {
      if (onSubmit) {
        onSubmit(errors, values);
      }
    });
  }

  render() {
    const {className, children} = this.props;
    const {activeTabKey, tabsIdList} = this.state;
    const TabChildren: React.ReactNode[] = [];
    const otherChildren: React.ReactNode[] = [];
    React.Children.forEach(children, item => {
      if (!item) {
        return;
      }

      // @ts-ignore
      if (item.type.typeName === 'LoginTab') {  // 此属性在 LoginTab.tsx 中定义
        TabChildren.push(item);
      } else {
        otherChildren.push(item);
      }
    });
    return (
      <LoginContext.Provider value={this.getContext()}>
        <div className={classNames(className, styles.login)}>
          <Form onSubmit={this.handleSubmit}>
            {tabsIdList.length ? (
              <React.Fragment>
                <Tabs
                  animated={false}
                  className={styles.tabs}
                  activeKey={activeTabKey}
                  onChange={this.onSwitch}
                >
                  {TabChildren}
                </Tabs>
                {otherChildren}
              </React.Fragment>
            ) : children}
          </Form>
        </div>
      </LoginContext.Provider>
    );
  }
}

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Login.Username = LoginItem.Username;
Login.Password = LoginItem.Password;
Login.Mobile = LoginItem.Mobile;
Login.Captcha = LoginItem.Captcha;

// 经 Form.create() 包装过的组件会自带 this.props.form 属性
export default Form.create<LoginProps>()(Login);

// interface WrappedLoginProps {
//
// }
//
// const WrappedLogin: React.FC<FormWrappedProps<LoginProps>> = props => (
//   Form.create()(Login);
// );
