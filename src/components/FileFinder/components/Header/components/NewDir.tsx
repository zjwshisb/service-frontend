import { App, Button, Input, Popconfirm } from 'antd';
import React from 'react';
import { storeDir } from '@/services';
import { useModel } from '@umijs/max';
import { Icon } from '@iconify/react';

const NewDir: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const [value, setValue] = React.useState('');

  const [err, setErr] = React.useState('');

  const [open, setOpen] = React.useState(false);

  const { message } = App.useApp();

  const { refresh, lastDir } = useModel('fileModel');

  const close = React.useCallback(() => {
    setOpen(false);
    setValue('');
    setLoading(false);
  }, []);

  const submit = React.useCallback(async () => {
    if (!value) {
      setErr('请输入目录名');
      return;
    }
    setLoading(true);
    try {
      await storeDir({
        name: value,
        pid: lastDir ? lastDir.id : 0,
      });
      message.success('操作成功');
      refresh();
      close();
    } catch (err) {
      setLoading(false);
    }
  }, [close, lastDir, message, refresh, value]);

  return (
    <Popconfirm
      open={open}
      onConfirm={submit}
      title={'文件夹名称'}
      onCancel={close}
      okButtonProps={{
        loading,
      }}
      description={
        <div>
          <Input
            value={value}
            onChange={(e) => {
              setErr('');
              setValue(e.currentTarget.value);
            }}
          />
          {<div className="text-red-600">{err}</div>}
        </div>
      }
    >
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        <Icon icon={'mingcute:new-folder-fill'}></Icon>
      </Button>
    </Popconfirm>
  );
};
export default NewDir;
