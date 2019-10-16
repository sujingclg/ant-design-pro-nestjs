import React from "react";
import {Table, Alert} from "antd";
import {TableProps, ColumnProps} from "antd/lib/table";
import styles from "./index.less";


// function initTotalList<T extends {needTotal: boolean;}>(columns: T[]): T[] {
//   const totalList: T[] = [];
//   columns.forEach(column => {
//     if (column.needTotal) {
//       totalList.push({...column, total: 0});
//     }
//   });
//   return totalList;
// }

/**
 * 类型参数 T 为 ant-design 的 Table 类的 dataSource 参数的元素的类型
 * dataSource 为 T 类型元素的列表
 */
interface StandardTableProps<T> extends TableProps<T>{
  rowKey?: string;
  columns: ColumnProps<T>[];
  data?: {
    list?: T[];
    pagination?: any;
  };
}

interface StandardTableState {
}

class StandardTable<T> extends React.Component<StandardTableProps<T>, StandardTableState> {

  readonly state: Readonly<StandardTableState>;

  constructor(props: StandardTableProps<T>) {
    super(props);
    // const {columns} = props;
    // const needTotalList = initTotalList(columns);
    this.state = {};
  }

  render() {
    const {data = {list: [], pagination: {}}, rowKey, ...restProps} = this.props;
    const {list=[], pagination} = data;
    const paginationProps = {
      ...pagination,
      showSizeChanger: true,
      showQuickJumper: true,
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={'12343'}
          />
        </div>
        <Table
          {...restProps}
          rowKey={rowKey || 'key'}
          dataSource={list}
          pagination={paginationProps}
        />
      </div>
    )
  }
}

export default StandardTable;