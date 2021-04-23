import React from 'react';
import { Spin } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons/lib';

const Index: React.FC<{
  isSuccess?: boolean;
}> = (props) => {
  return React.useMemo(() => {
    return (
      <>
        {props.isSuccess === undefined && <Spin />}
        {props.isSuccess === false && <InfoCircleOutlined className={'error'} />}
      </>
    );
  }, [props.isSuccess]);
};

export default Index;
