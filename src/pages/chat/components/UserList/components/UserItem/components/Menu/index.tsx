import React from 'react';
import { Modal } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import useRemoveUser from '@/hooks/useRemoveUser';
import { removeUser } from '@/services';
import HistorySession from '../HistorySession';
import { MessageOutlined, CloseOutlined, SwapOutlined } from '@ant-design/icons';
import styles from './index.less';

const Index: React.FC<{
  user: API.User;
}> = (props) => {
  const { setUser, setVisible } = useModel('useTransferModel');

  const show = useModel('useHistorySessionModal', (model) => model.show);

  const handleRemove = useRemoveUser();

  const handleDelete = React.useCallback(
    (user: API.User) => {
      if (user.disabled) {
        removeUser(user.id).then(() => {
          handleRemove(user);
        });
      } else {
        Modal.confirm({
          title: '提示',
          content: '确定断开与该用户的会话?',
          onOk() {
            removeUser(user.id).then(() => {
              handleRemove(user);
            });
          },
        });
      }
    },
    [handleRemove],
  );

  return (
    <>
      <HistorySession />
      <div className={styles.menuContent}>
        <MessageOutlined
          onClick={(e) => {
            show(props.user.id);
            e.stopPropagation();
          }}
        />
        {!props.user.disabled && (
          <SwapOutlined
            onClick={(e) => {
              e.stopPropagation();
              setUser(props.user);
              setVisible(true);
            }}
          />
        )}
        <CloseOutlined
          onClick={(e) => {
            handleDelete(props.user);
            e.stopPropagation();
          }}
        />
      </div>
    </>
  );
};
export default Index;
