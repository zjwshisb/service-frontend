import React from 'react';
import { Upload } from 'antd';
import { getToken } from '@/utils/auth';
import type { UploadFile } from 'antd/es/upload/interface';

const Index: React.FC<{
  onChange: (e: UploadFile) => void;
  action: string;
}> = (props) => {
  const headers = {
    Authorization: `bearer ${getToken()}`,
  };
  return (
    <Upload
      onChange={(e) => props.onChange(e.file)}
      action={props.action}
      accept="image/*"
      withCredentials={false}
      showUploadList={false}
      headers={headers}
    >
      {props.children}
    </Upload>
  );
};
export default Index;
