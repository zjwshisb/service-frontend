import React from 'react';
import { Timeline } from 'antd';
import Item from './components/Item';

const Index: React.FC<{
  messages: API.Message[];
}> = (props) => {
  return (
    <Timeline mode="alternate">
      {props.messages.map((v) => {
        return (
          <Timeline.Item
            color={v.source === 0 ? 'red' : 'green'}
            key={v.id}
            position={v.source === 0 ? 'left' : 'right'}
          >
            <Item item={v} key={v.id} />
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};
export default Index;
