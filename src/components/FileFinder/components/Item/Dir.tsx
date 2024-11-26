import React from 'react';
import { Tooltip } from 'antd';
import { useModel } from '@umijs/max';
import Layout from './Layout';
import { Icon } from '@iconify/react';
import { useMenu } from './useMenu';

const Dir: React.FC<{
  file: API.File;
}> = ({ file }) => {
  const { onDirClick } = useModel('fileModel');

  const menus = useMenu(file);

  return (
    <Layout
      menus={menus}
      active={true}
      onClick={() => {
        onDirClick(file);
      }}
      icon={
        <div className={'w-full h-full flex items-center justify-center'}>
          <Icon
            className={'text-5xl text-gray-600'}
            icon={'octicon:file-directory-open-fill-16'}
          ></Icon>
        </div>
      }
    >
      <Tooltip title={file.name} placement={'bottom'} mouseEnterDelay={0.3}>
        <div className={'pl-1 flex-1 text-ellipsis line-clamp-1'}>{file.name}</div>
      </Tooltip>
    </Layout>
  );
};

export default Dir;
