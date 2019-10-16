import React from "react";
import classNames from "classnames";
import {Badge, Icon, Spin, Tabs, Menu} from "antd";
import HeaderDropdown from "../HeaderDropdown";
import NoticeList, {NoticeListProps} from "./NoticeList";
import {NoticeIconDataItemType} from "./typings";
import styles from "./index.less";

export {NoticeListProps};

const {TabPane} = Tabs;

interface NoticeIconProps {
  className?: string;
  count?: number;  // 目前未读的通知数目
  loading?: boolean;  // 通知选项卡的加载状态, 默认false, 加载完毕
  onItemClick?: (item: NoticeIconDataItemType, tabProps: NoticeListProps) => void;
  onClear?: (title: string, tabKey: string) => void;  // 点击清空通知后的回调函数
  onViewMore?: (tabProps: NoticeListProps, event?: MouseEvent) => void;
  onPopupVisibleChange?: (visible: boolean) => void;  // 在弹出框开启/关闭事件发生时要执行的操作, 比如在开启时异步请求消息数据
  children: React.ReactElement<NoticeListProps>[];
}

interface NoticeIconState {
  visible: boolean;
}

class NoticeIcon extends React.Component<NoticeIconProps, NoticeIconState> {

  public static Tab = NoticeList;

  readonly state: Readonly<NoticeIconState>;

  constructor(props: NoticeIconProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  onItemClick = (item: NoticeIconDataItemType, tabProps: NoticeListProps): void => {
    const {onItemClick} = this.props;
    if (onItemClick) {
      onItemClick(item, tabProps);
    }
  };

  onClear = (title: string, tabKey: string): void => {
    const {onClear} = this.props;
    if (onClear) {
      onClear(title, tabKey);
    }
  };

  onViewMore = (tabProps: NoticeListProps, event: MouseEvent): void => {
    const {onViewMore} = this.props;
    if (onViewMore) {
      onViewMore(tabProps, event);
    }
  };

  /**
   * Antd的TabPane的key属性有默认值 .0  .1  ... 如果设置了 keyName, 则为 keyName/.0  keyName/.1  ...
   * @param activeKey
   */
  onTabChange = (activeKey: string): void => {
  };

  getNotificationBox(): React.ReactNode {

    const {children, loading} = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, (child: React.ReactElement<NoticeListProps>) => {
      if (!child) {
        return null;
      }
      const {data, title, tabKey, unreadCount, showClear, showViewMore, emptyText} = child.props;

      // 如果 unreadCount 为 undefined, 取 data 的长度
      const msgCount = unreadCount || unreadCount == 0 ? unreadCount : (data ? data.length : 0);

      const tabTitle = msgCount > 0 ? `${title} (${msgCount})` : title;
      return (
        <TabPane tab={tabTitle} key={tabKey}>
          <NoticeList
            title={title}
            tabKey={tabKey}
            data={data}
            onClick={(item) => this.onItemClick(item, child.props)}
            showClear={showClear}
            onClear={() => this.onClear(title, tabKey)}
            showViewMore={showViewMore}
            onViewMore={(event) => this.onViewMore(child.props, event)}
            emptyText={emptyText}
          />
        </TabPane>
      );
    });
    return (
      <React.Fragment>  {/* Dropdown组件的overlay属性要求传入的是Menu组件, 此处传入的不是Menu, 不用Fragment包裹会报错 */}
        <Spin spinning={loading} size="default" delay={300}>
          <Tabs className={styles.tabs} onChange={this.onTabChange}>
            {panes}
          </Tabs>
        </Spin>
      </React.Fragment>
    );
  }

  handleVisibleChange = (visible: boolean): void => {
    this.setState({visible});
    const {onPopupVisibleChange} = this.props;
    if (onPopupVisibleChange) {
      onPopupVisibleChange(visible);
    }
  };

  render() {
    const {className, count} = this.props;
    const {visible} = this.state;
    const noticeButtonClass = classNames(className, styles.noticeButton);

    const trigger = (
      <span className={classNames(noticeButtonClass, {opened: visible})}>
        <Badge
          className={styles.badge}
          count={count}
          overflowCount={99}
        >
          <Icon type="bell" className={styles.icon}/>
        </Badge>
      </span>
    );

    const notificationBox = this.getNotificationBox();
    if (!notificationBox) {
      // 如果 src/components/GlobalHeader/RightContent.tsx 中的 NoticeIcon 没有子元素, 则只渲染消息图标
      return trigger;
    }
    return (
      <HeaderDropdown
        overlay={notificationBox}
        overlayClassName={styles.popover}
        trigger={['click']}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
      >
        {trigger}
      </HeaderDropdown>
    )
  }
}

export default NoticeIcon;