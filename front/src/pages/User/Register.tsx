import React from 'react';
import {Form, Input, Button, Select, Popover, Progress} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {ProgressProps} from 'antd/lib/progress';
import Link from 'umi/link';
import styles from './Register.less';

const FormItem = Form.Item;
const {Option} = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (<div className={styles.success}>强度: 强</div>),
  pass: (<div className={styles.warning}>强度: 中</div>),
  poor: (<div className={styles.error}>强度: 弱</div>),
};

const passwordProgressMap: {[key: string]: ProgressProps['status']} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

interface RegisterProps extends FormComponentProps {
}

interface RegisterState {
  passwordHelp: string;
  isPopoverVisible: boolean;
  telephoneCountryCode: string;
}

class Register extends React.Component<RegisterProps, RegisterState> {
  readonly state: Readonly<RegisterState>;

  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      passwordHelp: '',
      isPopoverVisible: false,
      telephoneCountryCode: '86',
    };
  }

  getPasswordStatus(): keyof typeof passwordStatusMap {
    const {getFieldValue} = this.props.form;
    const password = getFieldValue('password');
    if (password && password.length > 9) {
      return 'ok';
    }
    if (password && password.length > 5) {
      return 'pass';
    }
    return 'poor';
  }

  renderPasswordProgress() {
    const {getFieldValue} = this.props.form;
    const password = getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();

    return password && password.length ? (
      <div className={styles.progress}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          strokeWidth={6}
          percent={password.length * 10 > 100 ? 100 : password.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  }

  checkPassword = (rule: any, value: any, callback: any) => {
    if (!value) {
      this.setState({
        passwordHelp: '请输入密码！',
        isPopoverVisible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        passwordHelp: '',
        isPopoverVisible: !!value,
      });
      if (value.length < 6) {
        callback('error')
      } else {
        callback();
      }
    }
  };

  checkConfirm = (rule: any, value: any, callback: any) => {
    const {getFieldValue} = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  changeCountryCode = (value: string) => {
    this.setState({
      telephoneCountryCode: value,
    })
  };

  handleSubmit: (event: React.FormEvent) => void = event => {
    event.preventDefault();
    const { form, } = this.props;
    form.validateFields()
  };

  render() {
    const {
      form: {getFieldDecorator}
    } = this.props;
    const {
      passwordHelp,
      isPopoverVisible,
      telephoneCountryCode,
    } = this.state;
    return (
      <div className={styles.main}>
        <h3>注册</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {required: true, message: '请输入邮箱地址!'},
                {type: 'email', message: '邮箱地址格式错误!'},
              ],
            })(<Input size="large" placeholder="邮箱"/>)}
          </FormItem>
          <FormItem help={passwordHelp}>
            <Popover
              getPopupContainer={node => node.parentNode as HTMLElement}
              placement="right"
              content={
                <div>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div>
                    请至少输入 6 个字符。请不要使用容易被猜到的密码。
                  </div>
                </div>
              }
              overlayStyle={{width: '240px'}}
              visible={isPopoverVisible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {validator: this.checkPassword}
                ],
              })(
                <Input size="large" type="password" placeholder="至少6位密码, 区分大小写"/>
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {required: true, message: '请确认密码!'},
                {validator: this.checkConfirm,},
              ],
            })(<Input size="large" type="password" placeholder="确认密码"/>)}
          </FormItem>
          <FormItem>
            <InputGroup compact>
              <Select
                size="large"
                value={telephoneCountryCode}
                onChange={this.changeCountryCode}
                style={{width: '20%'}}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
              {getFieldDecorator('mobile', {
                rules: [
                  {required: true, message: '请输入手机号!'},
                  {pattern: /^1\d{10}$/, message: '手机号格式错误!'},
                ]
              })(<Input size="large" style={{width: '80%'}} placeholder="手机号"/>)}
            </InputGroup>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              注册
            </Button>
            <Link className={styles.login} to="/user/login">
              使用已有账户登录
            </Link>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create<RegisterProps>()(Register);
