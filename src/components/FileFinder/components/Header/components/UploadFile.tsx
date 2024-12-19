import React from 'react';
import { Button } from 'antd';
import { Icon } from '@iconify/react';
import { useModel } from '@umijs/max';
import Upload from '@/components/Upload';

const Index: React.FC = () => {
  const { lastDir, fileType, refresh } = useModel('fileModel');

  return (
    <Upload onSuccess={refresh} dir={lastDir} isResource={true} multiple={true} fileType={fileType}>
      <Button type={'primary'}>
        <Icon icon={'material-symbols:upload'}></Icon>
      </Button>
    </Upload>
  );
};

export default Index;
