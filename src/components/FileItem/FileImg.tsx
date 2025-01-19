import React from 'react';
import { Image, ImageProps } from 'antd';
import AudioImg from './asset/audio.png';
import VideoImg from './asset/video.png';
import PdfImg from './asset/pdf.png';

const FileImg: React.FC<
  Omit<ImageProps, 'src'> & {
    type: Exclude<API.FileType, 'image' | 'dir'>;
  }
> = (props) => {
  const src = React.useMemo(() => {
    switch (props.type) {
      case 'video': {
        return VideoImg;
      }
      case 'audio': {
        return AudioImg;
      }
      case 'pdf': {
        return PdfImg;
      }
    }
  }, [props.type]);

  return <Image src={src} {...props}></Image>;
};
export default FileImg;
