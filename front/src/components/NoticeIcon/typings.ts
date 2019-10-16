export interface NoticeIconDataItemType {
  key?: string | number;
  avatar?: string | React.ReactNode;
  title?: string | React.ReactNode;
  extra?: string | React.ReactNode;
  description?: string | React.ReactNode;
  datetime?: string | React.ReactNode;
  style?: React.CSSProperties;
  isRead?: boolean;
}

export interface NoticeItem extends NoticeIconDataItemType {
  id: string;
  type: 'notification' | 'message' | 'event';
  status?: 'todo' | 'processing' | 'urgent' | 'doing';
}