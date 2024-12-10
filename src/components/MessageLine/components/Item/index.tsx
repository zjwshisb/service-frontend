import React from 'react';
import { Image, Card } from 'antd';
import classNames from 'classnames';
import FileImg from '@/components/FileItem/FileImg';

const Index: React.FC<{
  item: API.Message;
}> = (props) => {
  let content;
  let obj: API.NavigatorContent;
  switch (props.item.type) {
    case 'navigator':
      obj = JSON.parse(props.item.content);
      content = (
        <Card styles={{ body: { padding: '5px' } }} cover={<Image src={obj.image} />}>
          <Card.Meta title={obj.title} />
        </Card>
      );
      break;
    case 'image':
      content = <Image src={props.item.content} />;
      break;
    case 'video':
      content = <FileImg type={'video'}></FileImg>;
      break;
    case 'audio':
      content = <FileImg type={'audio'}></FileImg>;
      break;
    case 'text':
      content = <>{props.item.content}</>;
      break;
    default:
      content = <></>;
  }

  return (
    <div className={'inline-block'}>
      <div
        className={classNames('flex flex-row justify-end', {
          'flex-row-reverse': props.item.source === 0,
        })}
      >
        <div className={'flex-1 px-2.5 text-gray-600'}>
          <div>{props.item.received_at}</div>
          <div className={'whitespace-pre-wrap'}>{content}</div>
        </div>
      </div>
    </div>
  );
};
export default Index;
