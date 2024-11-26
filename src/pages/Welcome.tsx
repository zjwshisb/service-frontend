import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  const { selectFile } = useModel('fileModel');
  return (
    <PageContainer>
      111
      <Button
        onClick={() => {
          selectFile({
            count: 2,
          }).then((r) => {
            console.log(r);
          });
        }}
      >
        测试
      </Button>
    </PageContainer>
  );
};

export default Welcome;
