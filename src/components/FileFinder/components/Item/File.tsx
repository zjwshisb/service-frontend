import React from 'react';
import { Checkbox, Radio, Tooltip } from 'antd';
import { useModel } from '@umijs/max';
import { isArray } from 'lodash';
import Layout from './Layout';
import { useMenu } from './useMenu';
import { Else, If, Then } from 'react-if';
import FileItem from '@/components/FileItem';

const File: React.FC<{
  file: API.File;
}> = ({ file }) => {
  const { checked, triggerChecked, fileType, count } = useModel('fileModel');

  const isChecked = React.useMemo(() => {
    return checked.findIndex((f) => file.id === f.id) > -1;
  }, [checked, file]);

  const disabled = React.useMemo(() => {
    const typeMatch = () => {
      if (fileType !== undefined) {
        if (isArray(fileType)) {
          return !fileType.includes(file.type);
        } else {
          return fileType !== file.type;
        }
      }
      return false;
    };
    if (count <= 1) {
      return typeMatch();
    } else {
      if (!isChecked) {
        if (checked.length >= count) {
          return true;
        }
        return typeMatch();
      }
    }
    return false;
  }, [isChecked, count, fileType, checked.length, file.type]);

  const menus = useMenu(file);

  return (
    <Layout
      menus={menus}
      onClick={() => {
        if (!disabled) {
          triggerChecked(file);
        }
      }}
      active={!disabled}
      icon={
        <FileItem
          tooltip={false}
          border={true}
          preview={false}
          file={file}
          width={'112px'}
          height={'112px'}
          className={'w-full h-full'}
        />
      }
    >
      <If condition={count === 1}>
        <Then>
          <Radio checked={isChecked} className={'flex-shrink-0 flex'}></Radio>
        </Then>
        <Else>
          <Checkbox className={'flex-shrink-0 flex mr-2'} checked={isChecked} disabled={disabled} />
        </Else>
      </If>
      <Tooltip title={file.name} placement={'bottom'} mouseEnterDelay={0.3}>
        <div className={'flex-1 text-ellipsis line-clamp-1 cursor-pointer'}>{file.name}</div>
      </Tooltip>
    </Layout>
  );
};

export default File;
