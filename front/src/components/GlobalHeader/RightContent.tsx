import React from 'react';
import {connect} from 'dva';
import classNames from 'classnames';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import {Tag, message} from 'antd';
import {MenuProps} from 'antd/lib/menu';
import {formatMessage} from 'umi-plugin-react/locale';
import SelectLang from '../SelectLang';
import NoticeIcon, {NoticeListProps} from '../NoticeIcon';
import {NoticeIconDataItemType, NoticeItem} from '../NoticeIcon/typings';
import AvatarDropdown, {AvatarDropdownProps} from './AvatarDropdown';
import {CurrentUserType} from '../typings';
import {ConnectState, ConnectProps} from '@/models/connect';
import styles from './index.less';

/**
 * 由于 RightContent 组件中保存了过多的状态信息, 包括 currentUser 信息和 notice 信息,
 * 且此组件同时被 TopNavHeader 和 GlobalHeader 组件包含其中, 如果在其上层组件中与 Dva 进行交互,
 * 将出现重复代码, 即使在 src/layouts/Header.tsx 中与 Dva 交互, 也需要在两个组件中传入同名事件处理函数.
 * 因此, 尽管原则上不建议在组件中使用 connect 连接, 但在权衡考虑后还是决定在此处处理与 Dva 的交互.
 * TODO 后期可考虑用RightContentView组件将交互分到layouts中
 */
function mapStateToProps({user, global, loading}: ConnectState): Partial<RightContentProps> {
  return {
    currentUser: user.currentUser,
    notices: global.notices,
    isFetchingNotices: loading.effects['global/fetchNotices'],
  };
}

export interface RightContentProps
  extends
    Omit<ConnectProps, 'route'>,
    Partial<AvatarDropdownProps> {
  theme?: MenuProps['theme'];
  notices?: NoticeItem[];
  currentUser?: CurrentUserType;
  isFetchingNotices: boolean;
}

class RightContent extends React.Component<RightContentProps, {}> {

  readonly state: Readonly<{}>;

  constructor(props: RightContentProps) {
    super(props);
    this.state = {};
  }

  getGroupedNoticeData(): { [key: string]: NoticeItem[] } {
    const {notices = []} = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = {...notice};
      if (notice.datetime) {
        newNotice.datetime = moment(notice.datetime as string).fromNow();
      }
      if (notice.id) {
        newNotice.key = notice.id;
      }
      if (notice.extra && notice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[notice.status];
        newNotice.extra = (
          <Tag color={color} style={{marginRight: 0}}>
            {notice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  // TODO 把返回的键 [key: string] 换成 NoticeItem['type']
  getGroupedUnreadCounts(groupedNoticeData: { [key: string]: NoticeItem[] }): { [key: string]: number } {
    const groupedUnreadCounts: { [key: string]: number } = {};
    Object.keys(groupedNoticeData).forEach(key => {
      const oneTypeOfNoticeData = groupedNoticeData[key];
      if (!groupedUnreadCounts[key]) {
        groupedUnreadCounts[key] = 0;
      }
      if (Array.isArray(oneTypeOfNoticeData)) {
        groupedUnreadCounts[key] = oneTypeOfNoticeData.filter(item => !item.isRead).length;
      }
    });
    return groupedUnreadCounts;
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch && dispatch({
      type: 'global/fetchNotices',
    });
  }

  changeReadState: (item: NoticeIconDataItemType) => void = item => {
    const {key} = item;
    const {dispatch} = this.props;
    dispatch && dispatch({
      type: 'global/changeNoticeReadState',
      payload: key,
    });
  }

  handleNoticeClear: (title: string, tabKey: string) => void = (title, tabKey) => {
    message.success(`${formatMessage(
      {id: 'globalHeader.noticeIcon.cleared', defaultMessage: 'Cleared'})
      } ${title}`);
    const {dispatch} = this.props;
    dispatch && dispatch({
      type: 'global/clearNotices',
      payload: tabKey,
    });
  }

  handleViewMore: (tabProps: NoticeListProps) => void = (tabProps) => {
    message.info(`View more ${tabProps.tabKey}s.`);
  }

  handlePopupVisibleChange: (visible: boolean) => void = visible => {
    // if (visible) {
    //   const {dispatch} = this.props;
    // }
  }

  renderNotice = () => {
    const {currentUser, isFetchingNotices} = this.props;
    const groupedNoticeData = this.getGroupedNoticeData();
    const groupedUnreadCounts = this.getGroupedUnreadCounts(groupedNoticeData);
    return (
      <NoticeIcon
        className={styles.action}
        count={currentUser && currentUser.unreadCount}
        loading={isFetchingNotices}
        onItemClick={item => this.changeReadState(item)}
        onClear={this.handleNoticeClear}
        onViewMore={this.handleViewMore}
        onPopupVisibleChange={this.handlePopupVisibleChange}
      >
        <NoticeIcon.Tab
          tabKey='notification'
          title={formatMessage({id: 'globalHeader.noticeIcon.notification', defaultMessage: 'Notification'})}
          unreadCount={groupedUnreadCounts.notification}
          data={groupedNoticeData.notification}
          emptyText={formatMessage({id: 'globalHeader.noticeIcon.notification.empty', defaultMessage: ''})}
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey='message'
          title={formatMessage({id: 'globalHeader.noticeIcon.message', defaultMessage: 'Message'})}
          unreadCount={groupedUnreadCounts.message}
          data={groupedNoticeData.message}
          emptyText={formatMessage({id: 'globalHeader.noticeIcon.message.empty', defaultMessage: ''})}
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey='event'
          title={formatMessage({id: 'globalHeader.noticeIcon.event', defaultMessage: 'Event'})}
          unreadCount={groupedUnreadCounts.event}
          data={groupedNoticeData.event}
          emptyText={formatMessage({id: 'globalHeader.noticeIcon.event.empty', defaultMessage: ''})}
          showViewMore
        />
      </NoticeIcon>
    );
  }

  render(): React.ReactNode {
    const {
      theme,
      currentUser,
    } = this.props;
    let className = styles.right;
    if (theme === 'dark') {
      className = classNames(styles.right, styles.dark);
    }
    return (
      <div className={className}>
        {this.renderNotice()}
        <AvatarDropdown
          className={styles.action}
          onLogout={this.props.onLogout!}
          currentUser={currentUser!}
        />
        <SelectLang className={styles.action}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(RightContent);
