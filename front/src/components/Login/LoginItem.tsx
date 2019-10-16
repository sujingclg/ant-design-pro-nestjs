import React from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import {WrappedFormUtils} from 'antd/es/form/Form';
import {FormItemProps, ValidationRule} from 'antd/lib/form';
import {GetFieldDecoratorOptions} from 'antd/lib/form/Form';
import LoginContext, {UpdateActiveFunc} from './LoginContext';
import ItemMap, {ItemMapPropsType} from './map';
import styles from './index.less';

const FormItem = Form.Item;

interface WrappedFormItemProps extends FormItemProps {
  fieldId: string;  // getFieldDecorator 的 id 参数, 必填, 输入控件唯一标志.
  rules: ValidationRule[];
  updateActive?: UpdateActiveFunc;
  form: WrappedFormUtils;
  defaultValue?: any;
  onGetCaptcha?: (event?: MouseEvent) => Promise<{}>;
  countDown?: number;
  getCaptchaButtonText?: string | React.ReactNode;
  getCaptchaSecondText?: string | React.ReactNode;
  predefinedProps: ItemMapPropsType;
  placeholder?: string;
}

interface WrappedFormItemState {
  count: number;
}

class WrappedFormItem extends React.Component<WrappedFormItemProps, WrappedFormItemState> {
  readonly state: Readonly<WrappedFormItemState>;
  private interval?: NodeJS.Timer;

  constructor(props: WrappedFormItemProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const {updateActive, fieldId} = this.props;
    if (updateActive) {
      updateActive(fieldId);
    }
  }

  componentWillUnmount() {
    clearInterval(Number(this.interval));
  }

  /**
   * 当在父组件中向此子组件传入了同名方法时使用之, 否则使用内部定义的
   * 调用onGetCaptcha如果返回一个Promise对象, 则将runGetCaptchaCountDown传入此对象作为其执行器中的resolve可调用对象,
   * 否则直接调用runGetCaptchaCountDown方法
   */
  onGetCaptcha: (() => void) = () => {
    const { onGetCaptcha } = this.props;
    const result = onGetCaptcha ? onGetCaptcha() : null;
    if (result === null) {
      return;
    }
    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  }

  /**
   * 验证码的定时器, 每隔1秒刷新state的count属性
   */
  runGetCaptchaCountDown: (() => void) = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({count});
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({count});
      if (count <= 0) {
        clearInterval(Number(this.interval));
      }
    }, 1000);
  }

  getFormItemOptions(): GetFieldDecoratorOptions {
    const {defaultValue, predefinedProps, rules} = this.props;
    const options: GetFieldDecoratorOptions = {
      rules: rules || predefinedProps.rules,
    };
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  }

  render() {
    const {count} = this.state;
    const {
      form: {getFieldDecorator},
    } = this.props;

    // 这么写是为了防止 otherProps 中带入 props 中不属于 Input 元素的属性
    const {
      fieldId,
      rules,
      updateActive,
      form,
      defaultValue,
      onGetCaptcha,
      countDown,
      getCaptchaButtonText = 'captcha',
      getCaptchaSecondText = 'second',
      predefinedProps,
      ...restProps
    } = this.props;
    // const otherProps = _.pick(this.props, 'placeholder');
    // const otherProps = loadsh.omit(this.props,
    //   'fieldId',
    //   'rules',
    //   'updateActive',
    //   'form',
    //   'defaultValue',
    //   'onGetCaptcha',
    //   'countDown',
    //   'getCaptchaButtonText',
    //   'getCaptchaSecondText',
    //   'predefinedProps');

    const options = this.getFormItemOptions();

    if (fieldId === 'captcha') {
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator(fieldId, options)(<Input {...predefinedProps} {...restProps}/>)}
            </Col>
            <Col span={8}>
              <Button
                disabled={count > 0}
                className={styles.getCaptcha}
                size='large'
                onClick={this.onGetCaptcha}
              >
                {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
              </Button>
            </Col>
          </Row>
        </FormItem>
      );
    }

    return (
      <FormItem>
        {/*<Input {...itemProps}/>*/}
        {getFieldDecorator(fieldId, options)(<Input {...predefinedProps} {...restProps}/>)}
      </FormItem>
    );
  }
}

export interface LoginItemProps extends Partial<WrappedFormItemProps> {}

const LoginItem: { [key: string]: any } = {};
Object.keys(ItemMap).forEach((key: string) => {
  const item = ItemMap[key];
  LoginItem[key] = (props: LoginItemProps) => (
    <LoginContext.Consumer>
      {(value) => (
        <WrappedFormItem
          predefinedProps={item.props}
          rules={item.rules}
          {...props} // 此处用传入的属性和判断准则覆盖map.tsx中定义的
          fieldId={item.fieldId}
          updateActive={value.updateActive}
          form={value.form!}
        />
      )}
    </LoginContext.Consumer>
  );
});

export type LoginItemType = { [K in keyof typeof ItemMap]: React.FC<LoginItemProps> };

export default LoginItem as LoginItemType;
