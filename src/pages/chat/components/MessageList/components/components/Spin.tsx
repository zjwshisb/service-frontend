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
        {props.isSuccess === false && (
          <InfoCircleOutlined className={'error'} style={{ color: '#ff4d4f' }} />
        )}
      </>
    );
  }, [props.isSuccess]);
};

export default Index;
