import React from 'react';
import { Upload, message } from 'antd';
import { getToken } from '@/utils/auth';
import type { RcFile } from 'antd/lib/upload';
import ImgCrop from 'antd-img-crop';
import type { UploadChangeParam } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

const maxSize = 1024 * 1024 * 5;

const Index: React.FC<{
  action: string;
  corp?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  width?: string;
  height?: string;
}> = (props) => {
  const headers = {
    Authorization: `bearer ${getToken()}`,
  };

  const [url, setUrl] = React.useState<string | undefined>();

  React.useEffect(() => {
    setUrl(props.value);
  }, [props.value]);

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

  const onChange = React.useCallback(
    (e: UploadChangeParam) => {
      if (e.file.status === 'done' && props.onChange) {
        props.onChange(e.file.response.data.url);
      }
    },
    [props],
  );

  const uploadButton = props.children ? (
    props.children
  ) : (
    <div>
      {url ? (
        <img className={styles.img} src={url} />
      ) : (
        <div
          className={styles.upload}
          style={{
            width: props.width,
            height: props.height,
          }}
        >
          <PlusOutlined />
        </div>
      )}
    </div>
  );

  return props.corp ? (
    <ImgCrop quality={1} rotate={true} modalWidth={700}>
      <Upload
        onChange={onChange}
        onPreview={onPreview}
        action={props.action}
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
      action={props.action}
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
Index.defaultProps = {
  corp: false,
  width: '128px',
  height: '128px',
};
export default Index;
