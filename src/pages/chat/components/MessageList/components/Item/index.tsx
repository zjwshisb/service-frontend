import React from 'react';
import styles from './index.less';
import Avatar from '../components/Avatar';
import Spin from '../components/Spin';
import Text from '../components/Text';
import Image from '../components/Image';
import moment from 'moment';
import { isSameDate } from '@/utils';
import Notice from '../Notice';

const Index: React.FC<{
  message: APP.Message;
  prev?: APP.Message;
}> = (props) => {
  return React.useMemo(() => {
    const currMoment = moment(props.message.received_at * 1000);
    let time: JSX.Element = <></>;
    if (props.prev) {
      const prevMoment = moment(props.prev.received_at * 1000);
      const now = moment();
      if (isSameDate(prevMoment, currMoment)) {
        if (props.message.received_at - props.prev.received_at > 60 * 30) {
          if (isSameDate(currMoment, now)) {
            time = <Notice>{prevMoment.format('HH:mm:ss')}</Notice>;
          } else {
            time = <Notice>{prevMoment.format('YYYY-MM-DD HH:mm:ss')}</Notice>;
          }
        }
      } else {
        time = <Notice>{currMoment.format('YYYY-MM-DD HH:mm:ss')}</Notice>;
      }
    } else {
      time = <Notice>{currMoment.format('YYYY-MM-DD HH:mm:ss')}</Notice>;
    }
    return (
      <>
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
        {time}
      </>
    );
  }, [
    props.message.avatar,
    props.message.content,
    props.message.is_server,
    props.message.is_success,
    props.message.received_at,
    props.message.type,
    props.prev,
  ]);
};
export default Index;
