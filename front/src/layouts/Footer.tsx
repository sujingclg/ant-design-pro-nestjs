import React, {Fragment, memo} from "react";
import {Layout, Icon} from "antd";
import GlobalFooter from "@/components/GlobalFooter";

const {Footer} = Layout;

const FooterView: React.FC<{}> = memo(props => {
  return (
    <Footer style={{padding: 0}}>
      <GlobalFooter
        // links={[
        //   {
        //     key: '12',
        //     title: <Icon type="file"/>,
        //     href: '/user'
        //   }
        // ]}
        copyright={
          <Fragment>
            Copyright <Icon type="copyright"/> 2019 Created by Sujing
          </Fragment>
        }
      />
    </Footer>
  )
});

export default FooterView;
