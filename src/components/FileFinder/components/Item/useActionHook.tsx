import { App, Input } from 'antd';
import React from 'react';
import { deleteFile, updateFile } from '@/services';
import { useModel } from '@umijs/max';

export function useActionHook(file: API.File) {
  const { modal, message } = App.useApp();

  const { refresh } = useModel('fileModel');

  const removeFile = React.useCallback(() => {
    const name = file.type === 'dir' ? '目录' : '文件';
    modal.confirm({
      title: '提示',
      content: `确定删除${name}<${file.name}>?`,
      async onOk() {
        await deleteFile(file.id);
        message.success('操作成功');
        refresh();
      },
    });
  }, [file.id, file.name, file.type, message, modal, refresh]);

  const name = React.useRef(file.name);

  const renameFile = React.useCallback(() => {
    modal.confirm({
      title: '重命名',
      content: (
        <div>
          <Input
            defaultValue={name.current}
            onChange={(e) => {
              name.current = e.target.value;
            }}
          />
        </div>
      ),
      async onOk() {
        await updateFile(file.id, name.current);
        message.success('操作成功');
        refresh();
      },
    });
  }, [file.id, message, modal, refresh]);

  return {
    removeFile,
    renameFile,
  };
}
