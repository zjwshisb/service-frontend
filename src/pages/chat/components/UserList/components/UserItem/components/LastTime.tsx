import React from 'react';
import { timeFormat } from '@/utils';

const Index: React.FC<{
  time: number;
}> = (props) => {
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    setContent(timeFormat(props.time));
  }, [props.time]);

  return React.useMemo(() => {
    return <>{content}</>;
  }, [content]);
};
export default Index;
