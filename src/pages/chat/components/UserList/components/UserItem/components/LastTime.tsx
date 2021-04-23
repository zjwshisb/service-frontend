import React from 'react';
import moment from 'moment';

const Index: React.FC<{
  time: number;
}> = (props) => {
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    const today = moment();
    const pre = moment(props.time * 1000);
    if (
      pre.year() === today.year() &&
      pre.month() === today.month() &&
      today.date() === pre.date()
    ) {
      setContent(pre.format('HH:mm:ss'));
    } else {
      setContent(pre.format('YYYY-MM-DD'));
    }
  }, [props.time]);
  return React.useMemo(() => {
    return <>{content}</>;
  }, [content]);
};
export default Index;
