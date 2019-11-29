import React from "react";
import {Button, Form} from "antd";
import classNames from "classnames";
import styles from "./index.less";


const FormItem = Form.Item;

interface LoginSubmitProps {
  className?: string;
  loading?: boolean;
}

const LoginSubmit: React.FC<LoginSubmitProps> = (props => {
  const {className, ...rest} = props;
  const clsString = classNames(styles.submit, className);
  return (
    <FormItem>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest}/>
    </FormItem>
  )
});

export default LoginSubmit;
