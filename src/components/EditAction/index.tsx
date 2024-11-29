import React from 'react';
import { Button } from 'antd';
import { history } from '@@/core/history';
const EditAction: React.FC<{
  path?: string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}> = (props) => {
  const { title = '编辑', path, onClick } = props;
  return (
    <Button
      type={'primary'}
      size={'small'}
      onClick={(e) => {
        if (path) {
          history.push(path);
        } else if (onClick) {
          onClick(e);
        }
      }}
    >
      {title}
    </Button>
  );
};

export default EditAction;
