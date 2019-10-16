import React from "react";
import classNames from "classnames";
import {List, Avatar, Tabs} from "antd";
import {formatMessage} from "umi-plugin-react/locale";
import {NoticeIconDataItemType, NoticeItem} from "./typings";
import styles from "./NoticeList.less";


export interface NoticeListProps {
  tabKey: NoticeItem['type'];
  title: string;
  unreadCount?: number;
  data?: NoticeIconDataItemType[];
  onClick?: (item: NoticeIconDataItemType) => void;

  showClear?: boolean;
  onClear?: () => void;

  showViewMore?: boolean;
  onViewMore?: (event: any) => void;

  style?: React.CSSProperties;
  emptyText?: string;
}

const NoticeList: React.FC<NoticeListProps> = (props => {
  const {
    data = [],
    title,
    onClick,

    showClear = true,
    onClear,

    showViewMore,
    onViewMore,

    emptyText,
  } = props;

  const emptyImage = 'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg';

  if (data.length == 0) {
    return (
      <div className={styles.notFound}>
        {emptyImage ? <img src={emptyImage} alt="not found"/> : null}
        <div>{emptyText}</div>
      </div>
    );
  }

  const clearText = formatMessage({id: 'globalHeader.noticeIcon.clear', defaultMessage: 'Clear'});
  const viewMoreText = formatMessage({id: 'globalHeader.noticeIcon.viewMore', defaultMessage: 'View more'});

  return (
    <div>
      <List
        className={styles.list}
        dataSource={data}
        renderItem={item => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.isRead,  // 当isRead为true时将read类名添加到itemCls
          });
          const leftIcon = item.avatar ? (
            typeof item.avatar == 'string' ? (
              <Avatar className={styles.avatar} src={item.avatar}/>
            ) : (
              <span className={styles.iconElement}>{item.avatar}</span>
            )
          ) : null;
          return (
            <List.Item
              className={itemCls}
              key={item.key}
              onClick={() => (onClick && onClick(item))}
            >
              <List.Item.Meta
                className={styles.meta}
                avatar={leftIcon}
                title={
                  <div className={styles.title}>
                    {item.title}
                    <div className={styles.extra}>{item.extra}</div>
                  </div>
                }
                description={
                  <div>
                    <div className={styles.description}>{item.description}</div>
                    <div className={styles.datetime}>{item.datetime}</div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
      <div className={styles.bottomBar}>
        {showClear ? (
          <div onClick={onClear}>{clearText} {title}</div>
        ) : null}
        {showViewMore ? (
          <div onClick={onViewMore && (event => onViewMore(event))}>{viewMoreText}</div>
        ) : null}
      </div>
    </div>
  );
});

export default NoticeList;