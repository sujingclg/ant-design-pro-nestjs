import React from 'react';
// import {connect} from 'dva';
import {Row, Col, Card, Divider, Tag, Avatar} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import {ConnectProps} from '@/models/connect';
import Articles from './Articles';
import styles from './index.less';

import {getNotice} from './tempData';

type TabType = {
  key: 'articles' | 'applications' | 'projects',
  tab: React.ReactNode;
}

const operationTabList: TabType[] = [
  {
    key: 'articles',
    tab: (<span>文章</span>),
  },
  {
    key: 'applications',
    tab: (<span>应用</span>),
  },
  {
    key: 'projects',
    tab: (<span>项目</span>),
  },
];

interface CenterProps extends Omit<ConnectProps, 'route'> {}

interface CenterState {
  newTags?: any[];
  inputVisible: boolean;
  inputValue: string;
  selectedTabKey: TabType['key'];
}

// @connect(({loading, user}) => ({}))
class Center extends React.PureComponent<CenterProps, CenterState> {

  readonly state: Readonly<CenterState>;

  constructor(props: CenterProps) {
    super(props);
    this.state = {
      newTags: [],
      inputVisible: false,
      inputValue: '',
      selectedTabKey: 'articles',
    };
  }

//  static getDerivedStateFromProps(nextProps: CenterProps, prevState: CenterState): CenterState | null {
//     console.log('call getDerivedStateFromProps');
//     console.log(nextProps);
//     return null;
//   }

  handleTabChange = (key: string) => {
    this.setState({
      selectedTabKey: key as TabType['key'],
    });
  };

  renderChildren(): React.ReactNode {
    const {selectedTabKey} = this.state;
    switch (selectedTabKey) {
      case 'articles':
        return <Articles/>;
      case 'applications':
        return <div>applications</div>;
      case 'projects':
        return <div>projects</div>;
      default:
        return null
    }
  }

  render() {
    const {children}  = this.props;
    const {selectedTabKey}  = this.state;
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: '24px' }}>
              <div>
                <div className={styles.avatarHolder}>
                  <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt=""/>
                  <div className={styles.name}>姓名</div>
                  <div>个人签名</div>
                </div>
                <div className={styles.detail}>
                  details
                </div>
                <Divider dashed />
                <div className={styles.tags}>
                  <div className={styles.tagsTitle}>标签</div>
                  <Tag key="1">标签1</Tag>
                  <Tag key="2">标签2</Tag>
                  <Tag key="3">标签3</Tag>
                  <Tag key="4">标签4</Tag>
                </div>
                <Divider dashed />
                <div className={styles.team}>
                  <div className={styles.teamTitle}>团队</div>
                  <Row gutter={36}>
                    {getNotice.map(item => (
                      <Col className={styles.teamItem} key={item.id} lg={24} xl={12}>
                        <Avatar size="small" src={item.logo} />
                        {item.member}
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={selectedTabKey}
              onTabChange={this.handleTabChange}
            >
              {this.renderChildren()}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Center;
