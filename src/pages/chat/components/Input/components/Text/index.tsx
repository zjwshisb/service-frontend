import React from 'react';
import { Input } from 'antd';
import { useModel } from '@umijs/max';
import { createMsg } from '@/utils';
import styles from './index.less';

const Index: React.FC = () => {
  const { send } = useModel('useWebsocketModel');

  const { current } = useModel('useCurrentModel');

  const { text, setText, clear, append } = useModel('useInputModel');

  const ref = React.useRef<any>();

  React.useEffect(() => {
    if (!current?.disabled) {
      ref.current?.focus();
    }
  }, [current?.disabled, current?.id]);

  const sendMsg = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.code === 'Enter' && !event.shiftKey) {
        if (current) {
          if (text !== '') {
            createMsg(text, current.id).then((message) => {
              if (send(message)) {
                clear();
              }
            });
          }
          event.preventDefault();
        }
      }
      if (event.shiftKey && event.code === 'Enter') {
        append('\n');
        event.preventDefault();
      }
    },
    [current, text, send, clear, append],
  );
  return (
    <div className={styles.input}>
      <Input.TextArea
        ref={ref}
        showCount={true}
        maxLength={512}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={'enter发送/shirt enter 换行'}
        variant={'filled'}
        autoSize={{ maxRows: 6, minRows: 6 }}
        onKeyDown={sendMsg}
      />
    </div>
  );
};
export default Index;
