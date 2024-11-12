import React from 'react';
import { getMessageTypeLabel } from '@/pages/chat/util';

const Index: React.FC<{
  message: API.Message;
}> = (props) => {
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    setContent(getMessageTypeLabel(props.message.content, props.message.type));
  }, [props.message]);
  return React.useMemo(() => {
    return <>{content}</>;
  }, [content]);
};
export default Index;
