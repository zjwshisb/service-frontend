import React from 'react';
import { Image, ImageProps } from 'antd';
import AudioImg from './asset/audio.png';
import VideoImg from './asset/video.png';
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
    }
  }, [props.type]);

  return <Image src={src} {...props}></Image>;
};
export default FileImg;
