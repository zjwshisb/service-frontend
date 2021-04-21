import React from 'react';
import { Avatar, Spin } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons/lib';
import styles from './index.less';

const Index: React.FC<{
  message: APP.Message;
}> = (props) => {
  return React.useMemo(() => {
    return (
      <div className={styles.item} data-right={props.message.is_server}>
        <div className={styles.avatar}>
          <Avatar size={30} shape={'square'}>
            u
          </Avatar>
        </div>
        <div className={styles.word}>{props.message.content}</div>
        {props.message.is_server ? (
          <>
            {props.message.is_success === undefined && <Spin />}
            {props.message.is_success === false && <InfoCircleOutlined className={'error'} />}
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }, [props.message.is_server, props.message.content, props.message.is_success]);
};
export default Index;
