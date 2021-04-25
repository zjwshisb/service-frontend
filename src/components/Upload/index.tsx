import React from 'react';
import { Upload, message } from 'antd';
import { getToken } from '@/utils/auth';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile } from 'antd/lib/upload';

const maxSize = 1024 * 1024 * 5;

const Index: React.FC<{
  onChange: (e: UploadFile) => void;
  action: string;
}> = (props) => {
  const headers = {
    Authorization: `bearer ${getToken()}`,
  };

  const beforeUpload = React.useCallback((file: RcFile) => {
    const { size } = file;
    if (size > maxSize) {
      message.error('图片文件必须小于5M').then();
      return false;
    }
    return true;
  }, []);

  return (
    <Upload
      onChange={(e) => props.onChange(e.file)}
      action={props.action}
      accept="image/*"
      withCredentials={false}
      showUploadList={false}
      headers={headers}
      beforeUpload={beforeUpload}
    >
      {props.children}
    </Upload>
  );
};
export default Index;
