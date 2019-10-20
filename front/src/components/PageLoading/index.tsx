import React from 'react';
import {Spin} from 'antd';

const PageLoading: React.FC<{}> = (props => {
  return (
    <div style={{ paddingTop: '100px',textAlign: 'center' }}>
      <Spin size="large" />
    </div>
  )
});

export default PageLoading;
