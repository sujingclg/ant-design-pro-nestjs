import React from "react";
import {Card, Button, Typography, Divider} from "antd";
import {connect} from "dva";
import moment from "moment";
import {BulletinCard} from "./model";


const namespace = 'bulletins';
const {Title, Paragraph, Text} = Typography;

function mapStateToProps(state: any): Partial<BulletinShowProps> {
  const cardList: BulletinCard[] = state[namespace].cardList;
  const currentIndex: number = state[namespace].currentIndex;
  return {
    cardList,
    currentIndex,
  }
}

interface BulletinShowProps {
  cardList: BulletinCard[];
  currentIndex: number;
}

const BulletinShow: React.FC<BulletinShowProps> = (props => {
  const {cardList, currentIndex} = props;
  if (!cardList)
    return <div/>;
  const bulletin = cardList[currentIndex];
  return (
    <div>
      {bulletin && (
        <Card style={{minHeight: '400px', 'boxShadow': '3px 3px 5px rgba(0, 21, 41, 0.35)'}}>
          <Typography>
            <Title level={3}>{bulletin.title}</Title>
            <Text style={{marginRight: '30px'}}>
              {bulletin.author}
            </Text>
            <Text>
              {bulletin.timestamp && moment(bulletin.timestamp).subtract(10, 'days').calendar()}
            </Text>
            <Divider/>
            <Paragraph>{bulletin.body}</Paragraph>
          </Typography>
        </Card>
      )}
    </div>
  )
});

export default connect(mapStateToProps)(BulletinShow);