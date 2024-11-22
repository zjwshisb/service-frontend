import React from 'react';
import { Card, Image } from 'antd';

const Index: React.FC<{
  message: API.AutoMessage;
}> = (props) => {
  const { message } = props;
  switch (message.type) {
    case 'navigator':
      return (
        <Card
          hoverable
          className={'w-20'}
          styles={{
            body: {
              padding: 0,
            },
          }}
          cover={
            <div className={'w-20 h-10'}>
              <Image src={message.navigator?.image?.thumb_url} />
            </div>
          }
        >
          <Card.Meta title={message.navigator?.title} />
        </Card>
      );
    case 'file':
      return (
        <div className={'w-20 h-20'}>
          <Image className={'object-fill w-20 h-20'} src={message.file?.thumb_url} />
        </div>
      );
    case 'text':
      return <span>{props.message.content}</span>;
    default:
      return <></>;
  }
};
export default Index;
