import React from 'react';

import { useActionHook } from './useActionHook';

export function useMenu(file: API.File) {
  const { removeFile, renameFile } = useActionHook(file);

  return React.useMemo(() => {
    const menu = [
      {
        key: 'rename',
        label: '重命名',
        onClick: renameFile,
      },
      {
        key: 'delete',
        label: '删除',
        onClick: removeFile,
      },
    ];
    if (file.type !== 'dir') {
      menu.unshift({
        key: 'view',
        label: '预览',
        onClick: () => {
          window.open(file.url, '_blank');
        },
      });
    }
    return menu;
  }, [file.type, file.url, removeFile, renameFile]);
}
