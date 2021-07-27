import React from 'react';
import { Input } from 'antd';
import { useModel } from 'umi';
import { createMsg } from '@/utils';
import styles from './index.less';

const Index: React.FC = () => {
  const { send } = useModel('useWebsocketModel');

  const { current } = useModel('useCurrentModel');

  const { text, setText, clear } = useModel('useInputModel');

  const sendMsg = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.shiftKey && event.code === 'Enter') {
        if (current) {
          if (text !== '') {
            const action = createMsg(text, current.id);
            if (send(action)) {
              clear();
            }
          }
          event.preventDefault();
        }
      }
    },
    [current, text, send, clear],
  );
  return (
    <div className={styles.input}>
      <Input.TextArea
        showCount={true}
        maxLength={512}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={'enter+shirt 发送'}
        bordered={false}
        autoSize={{ maxRows: 6, minRows: 6 }}
        onKeyDown={sendMsg}
      />
    </div>
  );
};
export default Index;
