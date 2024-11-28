import React from 'react';
import { Upload, Button, App } from 'antd';
import { getToken } from '@/utils/auth';
import type { UploadChangeParam } from 'antd/es/upload';
import { Icon } from '@iconify/react';
import { useModel } from '@umijs/max';
import lodash from 'lodash';

const Index: React.FC = () => {
  const headers = {
    Authorization: `bearer ${getToken()}`,
  };

  const { lastDir, fileType, refresh } = useModel('fileModel');
  const { message } = App.useApp();

  const onChange = React.useCallback(
    (e: UploadChangeParam) => {
      if (e.file.status === 'done') {
        const { response } = e.file;
        if (response) {
          if (response.success) {
            refresh();
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
    [message, refresh],
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
        pid: lastDir ? lastDir.id : 0,
      }}
      className={'flex'}
      action={BASE_URL + '/files'}
      accept={accept}
      withCredentials={false}
      showUploadList={false}
      headers={headers}
      maxCount={5}
      multiple={true}
    >
      <Button type={'primary'}>
        <Icon icon={'material-symbols:upload'}></Icon>
      </Button>
    </Upload>
  );
};

export default Index;
