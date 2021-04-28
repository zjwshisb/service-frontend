import React, { CSSProperties, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import styles from './index.less';
import { handleAccept } from '@/services';
import { message, Button } from 'antd';
import lodash from 'lodash';

const Index = () => {
  const { waitingUsers, visible } = useModel('useWaitingUserModel');
  const { setUsers } = useModel('useUsersModel');

  const [top, setTop] = useState(0);

  const [left, setLeft] = useState(0);

  const style: CSSProperties = {
    top,
    left,
    visibility: visible ? 'visible' : 'hidden',
  };

  const accept = React.useCallback(
    (id: number) => {
      handleAccept(id)
        .then((res) => {
          setUsers((prevState) => {
            const newState = lodash.cloneDeep(prevState);
            newState.set(id, res.data);
            return newState;
          });
          message.success('接入成功').then();
        })
        .catch((err) => {
          message.error(err.data.message).then();
        });
    },
    [setUsers],
  );

  return (
    <div
      className={styles.index}
      style={style}
      draggable={'true'}
      onDragOver={(e) => {
        setTop(e.screenY);
        setLeft(e.screenX);
      }}
    >
      {waitingUsers.map((v) => {
        return (
          <div className={styles.item}>
            <div className={styles.info}>
              <div>{v.username}</div>
              <div>aaaaa</div>
            </div>
            <div className={styles.action}>
              <Button type="link" onClick={() => accept(v.id)}>
                接入
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Index;
