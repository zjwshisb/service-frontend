import React from 'react';
import { Button } from 'antd';
import { history } from '@@/core/history';
const Store: React.FC<{
  path: string;
  title?: string;
}> = (props) => {
  const { title = '新增', path } = props;
  return (
    <Button type={'primary'} onClick={() => history.push(path)}>
      {title}
    </Button>
  );
};

export default Store;
