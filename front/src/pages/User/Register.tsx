import React from 'react';
import { Form, Input, Button, Select, Row, Col, Popover, Progress } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import styles from './Register.less';

const FormItem = Form.Item;

interface RegisterProps extends FormComponentProps {}

interface RegisterState {}

class Register extends React.Component<RegisterProps, RegisterState> {
  readonly state: Readonly<RegisterState>;

  constructor(props: RegisterProps) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {};

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className={styles.main}>
        <h3>Register</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: '请输入邮箱地址!' },
                { type: 'email', message: '邮箱地址格式错误!' },
              ],
            })(<Input size="large" placeholder="邮箱"/>)}
          </FormItem>
          <FormItem>
            <Popover>
              {getFieldDecorator('password', {
                rules: [],
              })(
                <Input size="large" type="password" placeholder="至少6位密码, 区分大小写"/>
                )}
            </Popover>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create<RegisterProps>()(Register);
