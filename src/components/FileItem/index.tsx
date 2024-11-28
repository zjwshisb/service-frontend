import { Image, ImageProps, Tooltip } from 'antd';
import React, { HTMLProps } from 'react';
import { Case, Else, If, Switch, Then } from 'react-if';
import classNames from 'classnames';
import AudioImg from './asset/audio.png';
import VideoImg from './asset/video.png';
import NoImageImg from './asset/no-image.png';
import { ImagePreviewType } from 'rc-image';

type FileItemProps = {
  file: API.File;
  onClick?: HTMLProps<HTMLDivElement>['onClick'];
  className?: string;
  border?: boolean;
  width?: string | number;
  height?: string | number;
  tooltip?: boolean;
  preview?: boolean;
};

const FileItem: React.FC<FileItemProps> = (props) => {
  const { file, onClick, border = true, width, height, tooltip = true, preview = true } = props;

  const previewProps: ImagePreviewType | boolean = React.useMemo(() => {
    if (!preview) {
      return false;
    }
    switch (file.type) {
      case 'image': {
        return {
          src: file.url,
        };
      }
      case 'video': {
        return {
          toolbarRender: () => <></>,
          imageRender: () => {
            return <video muted width="100%" controls src={file.url} />;
          },
        };
      }
      case 'audio': {
        return {
          toolbarRender: () => <></>,
          imageRender: () => {
            return <audio muted controls src={file.url} />;
          },
        };
      }
    }
    return false;
  }, [file.type, file.url, preview]);

  const FileType = () => {
    const p: ImageProps = {
      width,
      height,
      preview: previewProps,
      loading: 'lazy',
    };
    return (
      <Switch>
        <Case condition={file.type === 'image'}>
          <Image
            fallback={NoImageImg}
            src={file.thumb_url}
            className={'object-contain'}
            {...p}
          ></Image>
        </Case>
        <Case condition={file.type === 'video'}>
          <Image {...p} src={VideoImg}></Image>
        </Case>
        <Case condition={file.type === 'audio'}>
          <Image {...p} src={AudioImg}></Image>
        </Case>
      </Switch>
    );
  };

  return (
    <div
      onClick={onClick}
      style={{
        width,
        height,
      }}
      className={classNames('inline-block', props.className, {
        'border border-dashed border-gray-300': border,
      })}
    >
      <If condition={tooltip}>
        <Then>
          <Tooltip title={file.name}>
            <FileType />
          </Tooltip>
        </Then>
        <Else>
          <FileType />
        </Else>
      </If>
    </div>
  );
};

export default FileItem;
