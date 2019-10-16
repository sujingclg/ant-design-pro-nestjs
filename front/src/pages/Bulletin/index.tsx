import React from "react"
import {Row, Col, Card, Button} from "antd";
import GridContent from "@/components/PageHeaderWrapper/GridContent";
import BulletinCards from  "./BulletinCards";
import BulletinShow from "./BulletinShow";


interface BulletinPageProps {}

const BulletinPage: React.FC<BulletinPageProps> = (props => {
  return (
    <GridContent>
      {/*<Row style={{margin: '10px 0'}}>*/}
        {/*<Col>*/}
          {/*<Button> 添加卡片 </Button>*/}
        {/*</Col>*/}
      {/*</Row>*/}
      <Row>
        <Col span={7} >
          <BulletinCards/>
        </Col>
        <Col span={17} style={{paddingLeft: '30px'}}>
          <BulletinShow/>
        </Col>
      </Row>
    </GridContent>
  )
});

export default BulletinPage;
