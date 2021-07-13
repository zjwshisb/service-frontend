import React from 'react';
import { Card } from 'antd';

const Index: React.FC<{
  content: string;
}> = (props) => {
  const item: API.NavigatorContent = JSON.parse(props.content);
  return (
    <Card
      hoverable
      bodyStyle={{ padding: '5px' }}
      cover={<img src={item.content} style={{ width: '300px', height: '150px' }} />}
    >
      <Card.Meta title={item.title} />
    </Card>
  );
};

export default Index;
