import React from 'react';
import {connect} from 'dva';
import {Checkbox, Alert, Modal} from 'antd';
import {ValidateCallback} from 'antd/lib/form';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';
import {formatMessage, FormattedMessage} from 'umi-plugin-locale';
import Login from '@/components/Login';
import {ConnectState, Dispatch} from '@/models/connect';
import styles from './Login.less';

const {Tab, Username, Password, Mobile, Captcha, Submit} = Login;

function mapStateToProps(state: ConnectState): Partial<LoginPageProps> {
  const {login, loading} = state;  // 传入的state是所有models的全集, 从中取出login和loading命名空间的state
  return {
    login,
    submitting: loading.effects['login/login'],
  };
}

interface LoginPageProps {
  dispatch: Dispatch;
  login: {
    status?: 'error' | 'ok';
    loginType?: 'account' | 'mobile';
  };
  submitting?: boolean;
}

interface LoginPageState {
  loginType: string;
  autoLogin: boolean;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  readonly state: Readonly<LoginPageState>;
  // private loginForm?: WrappedFormUtils;  // 在render方法中被赋值为组件所包含的Login组件的实例
  // private loginForm?: Form;  // 在render方法中被赋值为组件所包含的Login组件的实例
  private readonly loginForm: any;  // 在render方法中被赋值为组件所包含的Login组件的实例
  // private readonly loginForm: React.RefObject<typeof Form>;
  // TODO 确定 loginForm 的类型

  constructor(props: LoginPageProps) {
    super(props);
    this.loginForm = React.createRef();
    this.state = {
      loginType: 'account',
      autoLogin: true,
    };
  }

  onTabChange: (loginType: string) => void = loginType => {
    this.setState({loginType});
  }

  onGetCaptcha: () => Promise<any> = () => {
    return new Promise<{}>((resolve, reject) => {
      // /*
      this.loginForm.current.validateFields(['mobileNumber'], {}, (err: any, values: any) => {
        if (err) {
          reject(err);
        } else {
          const {dispatch} = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobileNumber,
          }).then(resolve)  // 此处的resolve实际上是@/components/Login/LoginItem.tsx中的runGetCaptchaCountDown方法
            .catch(reject);  // 在实现model的login模块前, 将一直触发reject

          Modal.info({
            title: '此项目为演示项目，并不会真的给您发送验证码。请切换到账户密码登录界面按提示登录',
          });
        }
      });
     // */
     //  resolve();
    });
  }

  handleSubmit: ValidateCallback<{[key: string]: string}> = (err, values) => {
    const {loginType} = this.state;
    // console.log(values);
    if (!err) {
      const {dispatch} = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          loginType,
        },
      });
    }
  }

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage: (content: string) => React.ReactNode = content => (
    <Alert style={{marginBottom: '24px'}} message={content} type='error' showIcon />
  )

  render() {
    const {login, submitting} = this.props;
    const {loginType, autoLogin} = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={loginType}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={this.loginForm}
        >
          <Tab key='account' tab={formatMessage({id: 'login.tabLoginCredentials'})}>
            {
              login.status === 'error' && login.loginType === 'account' && !submitting &&
              this.renderMessage(formatMessage({id: 'login.messageInvalidCredentials'}))
            }
            <Username
              placeholder={formatMessage({id: 'login.username'})}
              rules={[
                {
                  required: true,
                  message: formatMessage({id: 'validation.username.required'}),
                },
              ]}
            />
            <Password
              placeholder={formatMessage({id: 'login.password'})}
              rules={[
                {
                  required: true,
                  message: formatMessage({id: 'validation.password.required'}),
                },
              ]}
            />
          </Tab>
          <Tab key='mobile' tab={formatMessage({id: 'login.tabLoginMobile'})}>
            {
              login.status === 'error' && login.loginType === 'mobile' && !submitting &&
              this.renderMessage(formatMessage({id: 'login.messageInvalidVerificationCode'}))
            }
            <Mobile/>
            <Captcha
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({id: 'login.getCaptcha'})}
              getCaptchaSecondText={formatMessage({id: 'login.captchaSecond'})}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id='login.rememberMe'/>
            </Checkbox>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id='login.login'/>
          </Submit>
        </Login>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
