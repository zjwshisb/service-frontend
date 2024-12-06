import React from 'react';
import { Card } from 'antd';
import FileItem from '@/components/FileItem';

const MessageContent: React.FC<{
  message: API.AutoMessage;
}> = (props) => {
  const { message } = props;
  switch (message.type) {
    case 'navigator':
      if (message.navigator) {
        return (
          <Card
            hoverable
            className={'w-32 inline-block text-left'}
            styles={{
              body: {
                padding: 0,
              },
            }}
            cover={
              <img style={{ height: 60 }} src={message.navigator?.image?.thumb_url} alt={''} />
            }
          >
            <Card.Meta title={message.navigator?.title} />
          </Card>
        );
      }
      return '-';
    case 'text':
      return <div className={'whitespace-pre-wrap inline-block'}>{message.content}</div>;
    case 'audio':
    case 'video':
    case 'image':
      if (message.file) {
        return <FileItem width={'70px'} height={'70px'} file={message.file}></FileItem>;
      }
      return '-';

    default:
      return <></>;
  }
};

export default MessageContent;
