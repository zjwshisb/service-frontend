import React from 'react';
import { Upload, App } from 'antd';
import { getToken } from '@/utils/auth';
import type { UploadChangeParam } from 'antd/es/upload';
import lodash from 'lodash';

const Index: React.FC<
  React.PropsWithChildren<{
    onSuccess?: (file: API.File) => void;
    fileType?: API.FileType[] | API.FileType;
    dir?: API.File;
    multiple?: boolean;
    isResource?: boolean;
  }>
> = ({ onSuccess, fileType, dir, children, isResource = true, multiple = true }) => {
  const headers = {
    Authorization: `bearer ${getToken()}`,
  };

  const { message } = App.useApp();

  const onChange = React.useCallback(
    (e: UploadChangeParam) => {
      if (e.file.status === 'done') {
        const { response } = e.file;
        if (response) {
          if (response.success) {
            if (onSuccess) {
              onSuccess(response.data);
            }
          } else {
            message.error(response.message).then();
          }
        } else {
          message.error('网络错误').then();
        }
      }
      // 422
      if (e.file.status === 'error') {
        const { response } = e.file;
        if (response.message) {
          message.error(response.message).then();
        }
      }
    },
    [message, onSuccess],
  );

  const accept = React.useMemo(() => {
    if (!fileType) {
      return undefined;
    }
    if (lodash.isArray(fileType)) {
      return fileType
        .map((v) => {
          return `${v}/*`;
        })
        .join(',');
    }
    return `${fileType}/*`;
  }, [fileType]);

  return (
    <Upload
      onChange={onChange}
      data={{
        pid: dir ? dir.id : 0,
        isResource,
      }}
      className={'flex'}
      action={BASE_URL + '/files'}
      accept={accept}
      withCredentials={false}
      showUploadList={false}
      headers={headers}
      maxCount={5}
      multiple={multiple}
    >
      {children}
    </Upload>
  );
};

export default Index;
