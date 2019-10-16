import React from 'react';
import {Icon} from 'antd';
import {ValidationRule} from 'antd/lib/form';
import {GetFieldDecoratorOptions} from 'antd/lib/form/Form';
import styles from './index.less';

export interface ItemMapPropsType extends Partial<GetFieldDecoratorOptions> {
  size: 'large' | 'small';
  type?: string;
  prefix?: React.ReactNode;
  placeholder: string;
}

interface ItemMapType {
  [key: string]: {
    fieldId: string;
    props: ItemMapPropsType;
    rules: ValidationRule[];
  };
}

const ItemMap: ItemMapType = {
  Username: {
    fieldId: 'username',
    props: {
      size: 'large',
      prefix: <Icon type='user' className={styles.prefixIcon}/>,
      placeholder: 'Enter your username',
    },
    rules: [
      {
        required: true,
        message: 'Please enter your username!',
      },
    ],
  },
  Password: {
    fieldId: 'password',
    props: {
      size: 'large',
      type: 'password',
      prefix: <Icon type='lock' className={styles.prefixIcon}/>,
      placeholder: 'Enter your password',
    },
    rules: [
      {
        required: true,
        message: 'Please enter your password!',
      },
    ],
  },
  Mobile: {
    fieldId: 'mobileNumber',
    props: {
      size: 'large',
      prefix: <Icon type='mobile' className={styles.prefixIcon}/>,
      placeholder: 'Enter your mobile number',
    },
    rules: [
      {
        required: true,
        message: 'Please enter your mobile number!',
      },
      {
        pattern: /^1\d{10}$/,
        message: 'Incorrect mobile number format!',
      },
    ],
  },
  Captcha: {
    fieldId: 'captcha',
    props: {
      size: 'large',
      prefix: <Icon type='mail' className={styles.prefixIcon}/>,
      placeholder: 'captcha',
    },
    rules: [
      {
        required: true,
        message: 'Place enter Captcha',
      },
    ],
  },
};

export default ItemMap;
