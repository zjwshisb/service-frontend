import React from 'react';
import { Input } from 'antd';
import { useModel } from '@umijs/max';

const Index: React.FC = () => {
  const { send } = useModel('chat.websocket');

  const { current } = useModel('chat.currentUser');

  const { text, setText, clear, append } = useModel('chat.input');

  const ref = React.useRef<any>();

  React.useEffect(() => {
    if (!current?.disabled) {
      ref.current?.focus();
    }
  }, [current?.disabled, current?.id]);

  const sendMsg = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.code === 'Enter' && !event.shiftKey) {
        if (text !== '') {
          send(text, 'text');
          clear();
        }
        event.preventDefault();
      }
      if (event.shiftKey && event.code === 'Enter') {
        append('\n');
        event.preventDefault();
      }
    },
    [text, send, clear, append],
  );
  return (
    <div className={'flex px-1.5'}>
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
