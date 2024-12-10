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
          <InfoCircleOutlined
            className={
              'text-red-600 flex items-center justify-center cursor-pointer h-[30px] text-xl'
            }
          />
        )}
      </>
    );
  }, [props.isSuccess]);
};

export default Index;
