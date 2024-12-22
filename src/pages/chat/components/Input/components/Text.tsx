import React from 'react';
import { Input } from 'antd';
import { useModel } from '@umijs/max';
import { TextAreaRef } from 'antd/es/input/TextArea';

const Text: React.FC<{
  value: string;
  onChange: (s: string) => void;
}> = (props) => {
  const { send } = useModel('chat.websocket');

  const { current } = useModel('chat.currentUser');

  const ref = React.useRef<TextAreaRef>(null);

  React.useEffect(() => {
    if (!current?.disabled) {
      ref.current?.focus();
    }
  }, [current?.disabled, current?.id]);

  const sendMsg = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.code === 'Enter' && !event.shiftKey) {
        if (props.value !== '') {
          send(props.value, 'text');
          props.onChange('');
        }
        event.preventDefault();
      }
      if (event.shiftKey && event.code === 'Enter') {
        props.onChange(props.value + '\n');
        event.preventDefault();
      }
    },
    [props, send],
  );

  return (
    <div className={'flex px-1.5'}>
      <Input.TextArea
        ref={ref}
        showCount={true}
        maxLength={512}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        placeholder={'enter发送/shirt enter 换行'}
        variant={'filled'}
        autoSize={{ maxRows: 6, minRows: 6 }}
        onKeyDown={sendMsg}
      />
    </div>
  );
};
export default Text;