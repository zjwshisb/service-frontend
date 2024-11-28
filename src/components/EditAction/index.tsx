import React from 'react';
import { Button } from 'antd';
import { history } from '@@/core/history';
const EditAction: React.FC<{
  path: string;
  title?: string;
}> = (props) => {
  const { title = '编辑', path } = props;
  return (
    <Button type={'primary'} size={'small'} onClick={() => history.push(path)}>
      {title}
    </Button>
  );
};

export default EditAction;
