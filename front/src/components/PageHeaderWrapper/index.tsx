import React from "react";
import {PageHeader, Typography, Tabs} from "antd";
import GridContent from "./GridContent";
import RouteContext from "../RouteContext";
import styles from "./index.less";
import getBreadcrumbProps from "../utils/getBreadcrumbProps";
import {WithFalse} from "../typings";


const {Title} = Typography;

interface PageHeaderWrapperProps {
  title?: WithFalse<React.ReactNode>;
  extra?: React.ReactNode;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  hiddenBreadcrumb?: boolean;

  // Footer Props
  tabList?: { tab: string | React.ReactNode, key: string }[],
  tabActiveKey?: string,
  onTabChange?: (activeKey: string) => void,
  tabBarExtraContent?: React.ReactNode,
}

class PageHeaderWrapper extends React.Component<PageHeaderWrapperProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: PageHeaderWrapperProps) {
    super(props);
    this.state = {};
  }

  renderPageHeader = (
    content: React.ReactNode,  // 标题下面的文字段落内容
    extraContent: React.ReactNode,  // 整个页头右侧的展示图片
  ): React.ReactNode => {
    if (!content && !extraContent) {
      return null;
    }
    return (
      <div className={styles.detail}>
        <div className={styles.main}>
          <div className={styles.row}>
            {content && (
              <div className={styles.content}>
                {content}
              </div>
            )}
            {extraContent && (
              <div className={styles.extraContent}>
                {extraContent}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  renderFooter = (): React.ReactNode => {
    const {
      tabList,
      tabActiveKey,
      onTabChange,
      tabBarExtraContent
    } = this.props;
    if (tabList && tabList.length) {
      return (
        <Tabs
          className={styles.tabs}
          activeKey={tabActiveKey}
          onChange={key => {
            if (onTabChange) {
              onTabChange(key);
            }
          }}
          tabBarExtraContent={tabBarExtraContent}
        >
          {tabList.map(item => (
            <Tabs.TabPane tab={item.tab} key={item.key}/>
          ))}
        </Tabs>
      );
    }
    return null;
  };

  defaultPageHeaderRender: (() => React.ReactNode) = () => {
    // 从 ...restProps 中滤除其他属性
    const {
      title,
      content,
      extraContent,
      tabList,
      tabActiveKey,
      onTabChange,
      tabBarExtraContent,
      ...restProps
    } = this.props;

    const titleComponent = title ? (
      <React.Fragment>
        <Title
          level={4}
          style={{marginBottom: 0, display: 'inline-block'}}
        >
          {title}
        </Title>
      </React.Fragment>) : null;

    return (
      <RouteContext.Consumer>
        {value => {
          return (
            <PageHeader
              title={titleComponent}
              {...restProps}
              breadcrumb={getBreadcrumbProps(value)}
              footer={this.renderFooter()}
            >
              {this.renderPageHeader(content, extraContent)}
            </PageHeader>
          );
        }}
      </RouteContext.Consumer>
    );
  };

  render() {
    const {children} = this.props;
    return (
      <div style={{margin: '-24px -24px 0'}} className={styles.main}>
        <div className={styles.wrapper}>
          <GridContent>
            {this.defaultPageHeaderRender()}
          </GridContent>
        </div>
        {children ? (
          <div className={styles.childrenContent}>
            <GridContent>{children}</GridContent>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PageHeaderWrapper;