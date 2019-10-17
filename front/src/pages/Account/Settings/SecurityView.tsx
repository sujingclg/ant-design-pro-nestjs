import React, {Fragment} from 'react';
import {List} from 'antd';

const data = [
  {
    title: '账户密码',
    description: '当前密码强度：强',
  },
  {
    title: '密保手机',
    description: '已绑定手机：138****8293',
  },
  {
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
  },
  {
    title: '备用邮箱',
    description: '已绑定邮箱：ant***sign.com',
  },
];

interface SecurityViewProps {}

const SecurityView: React.FC<SecurityViewProps> = (props => {
  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item=>(
          <List.Item actions={[<a>Modify</a>,]}>
            <List.Item.Meta title={item.title} description={item.description}/>
          </List.Item>
        )}
      />
    </Fragment>
  )
});

export default SecurityView;
