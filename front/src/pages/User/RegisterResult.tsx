import React from 'react';
import {Button} from 'antd';
import Link from "umi/link";
import Result from '@/components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <a href="#">
      <Button size="large" type="primary">
        查看邮箱
      </Button>
    </a>
    <Link to="/user/login">
      <Button size="large">
        返回登陆页
      </Button>
    </Link>
  </div>
);

interface RegisterResultProps {}

const RegisterResult: React.FC<RegisterResultProps> = (props => {
  return (
    <Result
      className={styles.registerResult}
      type="success"
      title={
        <div className={styles.title}>
          你的账户：AntDesign@example.com 注册成功
        </div>
      }
      description="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户"
      actions={actions}
      style={{ marginTop: '56px' }}
    />
  )
});

export default RegisterResult;
