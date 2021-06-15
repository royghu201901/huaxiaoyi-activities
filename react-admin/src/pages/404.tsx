import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    // subTitle="Sorry, the page you visited does not exist."
    subTitle="糟糕，没找到您需要的页面，要不返回首页看看？"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        返回首页
      </Button>
    }
  />
);

export default NoFoundPage;
