import React from 'react';

const Index: React.FC<{
  message: API.Message;
}> = (props) => {
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    switch (props.message.type) {
      case 'text': {
        setContent(props.message.content);
        break;
      }
      case 'image': {
        setContent('[图片]');
        break;
      }
      case 'navigator': {
        setContent('[导航卡片]');
        break;
      }
      default: {
        setContent('');
      }
    }
  }, [props.message]);
  return React.useMemo(() => {
    return <>{content}</>;
  }, [content]);
};
export default Index;
