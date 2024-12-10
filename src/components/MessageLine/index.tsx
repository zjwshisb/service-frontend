import React from 'react';
import { Timeline } from 'antd';
import Item from './components/Item';

const Index: React.FC<{
  messages: API.Message[];
  className?: string;
}> = (props) => {
  return (
    <Timeline
      className={props.className}
      mode="alternate"
      items={props.messages.map((v) => {
        return {
          color: v.source === 0 ? 'red' : 'green',
          key: v.id,
          position: v.source === 0 ? 'left' : 'right',
          children: <Item item={v} />,
        };
      })}
    ></Timeline>
  );
};
export default Index;
