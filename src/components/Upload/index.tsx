import React from 'react';
import { Upload, message } from 'antd';
import { getToken } from '@/utils/auth';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile } from 'antd/lib/upload';
import ImgCrop from 'antd-img-crop';

const maxSize = 1024 * 1024 * 5;

const Index: React.FC<{
  onChange: (e: UploadFile) => void;
  action: string;
  corp?: boolean;
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

  const onPreview = React.useCallback(async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    }
  }, []);

  return props.corp ? (
    <ImgCrop quality={1} rotate={true} modalWidth={700}>
      <Upload
        onChange={(e) => props.onChange(e.file)}
        onPreview={onPreview}
        action={props.action}
        accept="image/*"
        withCredentials={false}
        showUploadList={false}
        headers={headers}
        beforeUpload={beforeUpload}
      >
        {props.children}
      </Upload>
    </ImgCrop>
  ) : (
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
Index.defaultProps = {
  corp: false,
};
export default Index;
