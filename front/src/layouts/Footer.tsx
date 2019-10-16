import React from "react";
import {Layout, Icon} from "antd";
import GlobalFooter from "@/components/GlobalFooter";


const {Footer} = Layout;

interface FooterViewProps {}

const FooterView: React.FC<FooterViewProps> = (props => {
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
          <React.Fragment>
            Copyright <Icon type="copyright"/> 2019 Created by Sujing
          </React.Fragment>
        }
      />
    </Footer>
  )
});

export default FooterView;