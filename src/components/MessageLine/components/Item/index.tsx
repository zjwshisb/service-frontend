import React from 'react';
import { Avatar, Image, Card } from 'antd';
import moment from 'moment';
import style from './index.less';

const Index: React.FC<{
  item: API.Message;
}> = (props) => {
  let content;
  let obj: API.NavigatorContent;
  switch (props.item.type) {
    case 'navigator':
      obj = JSON.parse(props.item.content);
      content = (
        <Card bodyStyle={{ padding: '5px' }} cover={<Image src={obj.content} />}>
          <Card.Meta title={obj.title} />
        </Card>
      );
      break;
    case 'image':
      content = <Image src={props.item.content} />;
      break;
    case 'text':
      content = <>{props.item.content}</>;
      break;
    default:
      content = <></>;
  }

  return (
    <div className={style.container}>
      <div className={`${style.item} ${props.item.source === 0 ? style.right : ''}`}>
        <div className={style.avatar}>
          <Avatar src={props.item.avatar} shape="square" />
        </div>
        <div className={style.content}>
          <div className={style.time}>
            {moment(props.item.received_at * 1000).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <div className={style.body}>{content}</div>
        </div>
      </div>
    </div>
  );
};
export default Index;
