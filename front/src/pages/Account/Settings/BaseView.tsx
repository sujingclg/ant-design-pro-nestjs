import React from 'react';
import {Upload, Button, Form, Input, Select, message} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import styles from './BaseView.less';

const FormItem = Form.Item;
const {Option} = Select;

interface BaseViewProps extends FormComponentProps {}

interface BaseViewState {}

class BaseView extends React.Component<BaseViewProps, BaseViewState> {

  private readonly rootRef: React.RefObject<HTMLDivElement>;

  readonly state: Readonly<BaseViewState>;

  constructor(props: BaseViewProps) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    const {getFieldsValue, setFieldsValue} = this.props.form;
    this.props.form.setFields({
      email: { value: 'antdesign@alipay.com' },
      name: { value: 'Simon Rich' },
      country: { value: 'China' },
      address: { value: '西湖区工专路 77 号' },
    })
  }

  handleSubmit: (event: React.FormEvent) => void = () => {
    console.log('call handleSubmit')
  };

  onValidateForm = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      form: { validateFields }
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        message.success('基本信息更新成功');
      }
    });
  };

  render() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.rootRef}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {required: true, message: '请输入您的邮箱!'}
                ]
              })(<Input/>)}
            </FormItem>
            <FormItem label="昵称">
              {getFieldDecorator('name', {
                rules: [
                  {required: true, message: '请输入您的昵称!'}
                ]
              })(<Input/>)}
            </FormItem>
            <FormItem label="个人简介">
              {getFieldDecorator('profile', {
                rules: [
                  {required: true, message: '请输入个人简介!'}
                ]
              })(
                <Input.TextArea
                  placeholder="个人简介"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem label="国家/地区">
              {getFieldDecorator('country', {
                rules: [
                  {required: true, message: '请输入国家/地区!'}
                ]
              })(<Select style={{ maxWidth: '220px' }}>
                <Option value="China">中国</Option>
              </Select>)}
            </FormItem>
            <FormItem label="街道地址">
              {getFieldDecorator('address', {
                rules: [
                  {required: true, message: '请输入您的街道地址!'}
                ]
              })(<Input/>)}
            </FormItem>
            <Button
              type="primary"
              onClick={this.onValidateForm}
              // htmlType="submit"
            >
              更新基本信息
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          <div className={styles.avatarTitle}>头像</div>
          <div className={styles.avatar}>
            <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="avatar"/>
          </div>
          <Upload fileList={[]}>
            <div className={styles.buttonView}>
              <Button icon="upload">更换头像</Button>
            </div>
          </Upload>
        </div>
      </div>
    )
  }
}

export default Form.create<BaseViewProps>()(BaseView);
