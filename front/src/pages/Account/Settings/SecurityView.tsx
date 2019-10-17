import React, {Fragment} from "react";
import {List} from 'antd';

interface SecurityViewProps {}

const SecurityView: React.FC<SecurityViewProps> = (props => {
  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={[{key:1}, {key:2}, {key:3}]}
        renderItem={item=>(
          <List.Item actions={[<a>Modify</a>,]}>
            <List.Item.Meta title={'Item title ' + item.key} description={'Item description'}/>
          </List.Item>
        )}
      />
    </Fragment>
  )
});

export default SecurityView;
