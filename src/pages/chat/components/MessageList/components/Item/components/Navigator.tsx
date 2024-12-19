import React from 'react';
import { Card } from 'antd';
import Wrapper from './Wrapper';
const Navigator: React.FC<{
  content: string;
}> = (props) => {
  const item: API.NavigatorContent = JSON.parse(props.content);
  return (
    <Wrapper>
      <Card
        hoverable
        styles={{
          body: {
            padding: '5px',
          },
        }}
        cover={<img src={item.content} style={{ width: '300px', height: '150px' }} />}
      >
        <Card.Meta title={item.title} />
      </Card>
    </Wrapper>
  );
};

export default Navigator;
