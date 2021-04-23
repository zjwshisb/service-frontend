import React from 'react';
import styles from './index.less';
import Avatar from '../components/Avatar';
import Spin from '../components/Spin';
import Text from '../components/Text';
import Image from '../components/Image';

const Index: React.FC<{
  message: APP.Message;
}> = (props) => {
  return (
    <div className={styles.item} data-right={props.message.is_server}>
      <div className={styles.avatar}>
        <Avatar src={props.message.avatar} />
      </div>
      <div className={styles.content} data-msg-type={props.message.type}>
        {props.message.type === 'text' && <Text content={props.message.content} />}
        {props.message.type === 'image' && <Image content={props.message.content} />}
      </div>
      {props.message.is_server && <Spin isSuccess={props.message.is_success} />}
    </div>
  );
};
export default Index;
