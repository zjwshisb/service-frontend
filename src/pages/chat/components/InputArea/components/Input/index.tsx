import React from 'react';
import { Input, Form } from 'antd';
import { useModel } from 'umi';
import { createMsg } from '@/utils';
import styles from './index.less';

const Index: React.FC = () => {
  const [form] = Form.useForm<{
    message: string;
  }>();
  const webSocket = useModel('useWebsocketModel');

  const { current } = useModel('useCurrentModel');

  const sendMsg = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.shiftKey && event.code === 'Enter') {
        if (current) {
          const content = form.getFieldValue('message');
          if (content !== '') {
            const action = createMsg(content, current.id);
            webSocket.send(action);
            form.setFieldsValue({
              message: '',
            });
          }
          event.preventDefault();
        }
      }
    },
    [current, form, webSocket],
  );
  return (
    <div className={styles.input}>
      <Form form={form} initialValues={{ message: '' }}>
        <Form.Item name="message">
          <Input.TextArea
            showCount={true}
            maxLength={512}
            placeholder={'enter+shirt 发送'}
            bordered={false}
            autoSize={{ maxRows: 6, minRows: 6 }}
            onKeyDown={sendMsg}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default Index;
