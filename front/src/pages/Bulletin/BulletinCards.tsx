import React from "react";
import {Card, Button, Pagination, Spin, Row, Col} from "antd";
import {connect} from "dva";
import {Dispatch} from "@/models/connect";
import {BulletinCard} from "./model";
import styles from "./index.less";
import GridContent from "@/components/PageHeaderWrapper/GridContent";

const namespace = 'bulletins';

function mapStateToProps(state: any): Partial<BulletinCardsProps> {
  const cardList: BulletinCard[] = state[namespace].cardList;
  const currentIndex: number = state[namespace].currentIndex;
  const totalCards: number = state[namespace].totalCards;
  const cardsLoading: boolean = state.loading.effects[`${namespace}/queryBulletins`];
  return {
    cardList,
    currentIndex,
    totalCards,
    cardsLoading,
  }
}

function mapDispatchToProps(dispatch: Dispatch): Partial<BulletinCardsProps> {
  return {
    onDidMount: (): void => {
      dispatch({
        type: `${namespace}/queryBulletins`,
        payload: {currentPage: 0, pageSize: 5}
      })
    },

    onClickCard: (cardIndex: number): void => {
      const action = {
        type: `${namespace}/changeCurrentIndex`,
        payload: {cardIndex},
      };
      dispatch(action);
    },

    onPaginationChange: (page: number, pageSize?: number): void => {
      dispatch({
        type: `${namespace}/queryBulletins`,
        payload: {currentPage: page-1, pageSize}
      });
    }
  };
}

interface BulletinCardsProps {
  cardList?: BulletinCard[];
  currentIndex?: number;
  totalCards?: number;
  cardsLoading?: boolean;
  onClickCard?: (cardIndex: number) => void;
  onDidMount?: () => void;
  onPaginationChange?: (page: number, pageSize?: number) => void;
}

interface BulletinCardsState {}

class BulletinCards extends React.Component<BulletinCardsProps, BulletinCardsState> {
  readonly state: Readonly<BulletinCardsState>;

  constructor(props: BulletinCardsProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.onDidMount!();
  };

  // handlePaginationChange: (page: number, pageSize?: number)=>void = (page, pageSize) => {
  //   console.log(page);
  // };

  render() {
    const {
      cardsLoading,
      cardList,
      currentIndex,
      onClickCard,
      totalCards,
      onPaginationChange,
    } = this.props;

    return (
      <div>
        {/*<Button style={{margin: '0 0 10px'}} type="default" onClick={()=>this.props.onClickAdd({*/}
        {/*setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',*/}
        {/*punchline: 'here we use dva',*/}
        {/*})}> 添加卡片 </Button>*/}
        <Spin tip="loading..." spinning={cardsLoading} size="large">
          <div className={styles.cardList} style={{overflow: 'auto', height: '80vh'}}>
            {
              cardList && cardList.map((card, index) => {
                return (
                  <Card
                    key={card.id}
                    onClick={()=>onClickCard!(index)}
                    className={index == currentIndex ? styles["current-card"] : styles["card"]}
                  >
                    <strong>{card.title}</strong>
                    <p>{card.body.slice(0, 20)}...</p>
                  </Card>
                );
              })
            }
          </div>
        </Spin>
        <Pagination
          size="small"
          total={totalCards}
          // showQuickJumper
          defaultPageSize={5}
          onChange={onPaginationChange}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BulletinCards);