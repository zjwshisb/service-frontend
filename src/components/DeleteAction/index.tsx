import React from 'react';
import { Button, App } from 'antd';
const DeleteAction: React.FC<{
  id: React.Key;
  request: (id: React.Key) => Promise<API.Response>;
  notice?: string;
  onSuccess?: () => void;
  title?: string;
}> = (props) => {
  const { id, request, notice = '确定删除该行数据?', title = '删除' } = props;
  const { modal, message } = App.useApp();

  return (
    <Button
      type={'primary'}
      size={'small'}
      danger={true}
      onClick={() => {
        modal.confirm({
          title: '提示',
          content: notice,
          async onOk() {
            try {
              await request(id);
              message.success('操作成功');
              props.onSuccess?.();
            } catch {}
          },
        });
      }}
    >
      {title}
    </Button>
  );
};

export default DeleteAction;
