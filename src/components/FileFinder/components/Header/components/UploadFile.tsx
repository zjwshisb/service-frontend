import { Button } from 'antd';
import Upload from '@/components/Upload';
import React from 'react';

const UploadFile: React.FC = () => {
  return (
    <Upload path={'11'}>
      <Button type={'primary'}>上传文件</Button>
    </Upload>
  );
};
export default UploadFile;
