import React from 'react';
import { Upload, message, Image, Tooltip } from 'antd';
import { getToken } from '@/utils/auth';
import type { RcFile } from 'antd/lib/upload';
import ImgCrop from 'antd-img-crop';
import type { UploadChangeParam } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { CloseCircleOutlined } from '@ant-design/icons/lib';

const maxSize = 1024 * 1024 * 5;

const Index: React.FC<
  React.PropsWithChildren<{
    corp?: boolean;
    onChange?: (value?: API.File) => void;
    value?: API.File;
    width?: string;
    height?: string;
    path: string;
  }>
> = (props) => {
  const { width = '120px', height = '120px', corp = false } = props;

  const headers = {
    Authorization: `bearer ${getToken()}`,
  };

  const [file, setFile] = React.useState<API.File | undefined>();

  React.useEffect(() => {
    setFile(props.value);
  }, [props.value]);

  const beforeUpload = React.useCallback((file: RcFile) => {
    const { size } = file;
    if (size > maxSize) {
      message.error('图片文件必须小于5M').then();
      return false;
    }
    return true;
  }, []);

  const onChange = React.useCallback(
    (e: UploadChangeParam) => {
      if (e.file.status === 'done' && props.onChange) {
        props.onChange(e.file.response.data);
      }
    },
    [props],
  );

  const clear = React.useCallback(() => {
    setFile(undefined);
    if (props.onChange) {
      props.onChange(undefined);
    }
  }, [props]);

  const uploadButton = props.children ? (
    props.children
  ) : (
    <div>
      <div
        style={{ width, height }}
        className={
          'flex relative border-dashed border-2 items-center justify-center cursor-pointer'
        }
      >
        {file ? (
          <>
            <div className={'w-full h-full overflow-hidden'}>
              <Tooltip title={file.name}>
                <Image
                  className={'object-fill'}
                  src={file.thumb_url}
                  alt=""
                  preview={false}
                ></Image>
              </Tooltip>
            </div>
            <CloseCircleOutlined
              className={'text-red-600 absolute top-[-10px] right-[-10px]'}
              onClick={(e) => {
                clear();
                e.stopPropagation();
              }}
            />
          </>
        ) : (
          <PlusOutlined />
        )}
      </div>
    </div>
  );

  return corp ? (
    <ImgCrop quality={1} modalWidth={700}>
      <Upload
        className={'flex'}
        onChange={onChange}
        action={BASE_URL + '/images?path=' + props.path}
        accept="image/*"
        withCredentials={false}
        showUploadList={false}
        headers={headers}
        beforeUpload={beforeUpload}
      >
        {uploadButton}
      </Upload>
    </ImgCrop>
  ) : (
    <Upload
      onChange={onChange}
      className={'flex'}
      action={BASE_URL + '/images?path=' + props.path}
      accept="image/*"
      withCredentials={false}
      showUploadList={false}
      headers={headers}
      beforeUpload={beforeUpload}
    >
      {uploadButton}
    </Upload>
  );
};

export default Index;
