import React from 'react';
import { Card, Image } from 'antd';
import styles from './index.less';

const Index: React.FC<{
  message: API.AutoMessage;
}> = (props) => {
  let navigator: API.NavigatorContent;
  switch (props.message.type) {
    case 'navigator':
      navigator = JSON.parse(props.message.content);
      return (
        <Card
          hoverable
          bodyStyle={{ padding: '5px' }}
          className={styles.navigator}
          cover={<img src={navigator.content} className={styles.cover} />}
        >
          <Card.Meta title={navigator.title} />
        </Card>
      );
    case 'image':
      return <Image src={props.message.content} className={styles.image} width={'300px'} />;
    case 'text':
      return <span>{props.message.content}</span>;
    default:
      return <></>;
  }
};
export default Index;
