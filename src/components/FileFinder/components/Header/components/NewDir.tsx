import { Button, Input, Popconfirm } from 'antd';
import React from 'react';

const NewDir: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const [value, setValue] = React.useState('');

  const [err, setErr] = React.useState('');

  const [open, setOpen] = React.useState(false);

  const submit = React.useCallback(() => {
    if (!value) {
      setErr('请输入文件名');
      return;
    }
    setLoading(true);
  }, [value]);

  const close = React.useCallback(() => {
    setOpen(false);
    setValue('');
    setLoading(false);
  }, []);

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
        新建文件夹
      </Button>
    </Popconfirm>
  );
};
export default NewDir;
