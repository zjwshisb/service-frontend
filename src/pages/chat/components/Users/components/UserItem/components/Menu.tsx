import React from 'react';
import { App, Space } from 'antd';
import { useSnapshot } from '@umijs/max';
import useRemoveUser from '@/pages/chat/hooks/useRemoveUser';
import { removeUser } from '@/services';
import { MessageOutlined, CloseOutlined, SwapOutlined } from '@ant-design/icons';
import { When } from 'react-if';
import transfer from '@/pages/chat/store/transfer';
import historySession from '@/pages/chat/store/historySession';

const Menu: React.FC<{
  user: API.User;
}> = (props) => {
  const { setUser, setVisible } = useSnapshot(transfer);

  const { modal } = App.useApp();

  const sessionStore = useSnapshot(historySession);

  const handleRemove = useRemoveUser();

  const handleDelete = React.useCallback(
    (user: API.User) => {
      if (user.disabled) {
        removeUser(user.id).then(() => {
          handleRemove(user);
        });
      } else {
        modal.confirm({
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
    [handleRemove, modal],
  );

  return (
    <div className={'w-full text-right text-sm leading-3'}>
      <Space size={'small'}>
        <MessageOutlined
          onClick={(e) => {
            sessionStore.show(props.user.id);
            e.stopPropagation();
          }}
        />
        <When condition={!props.user.disabled}>
          <SwapOutlined
            onClick={(e) => {
              setUser(props.user);
              setVisible(true);
              e.stopPropagation();
            }}
          />
        </When>
        <CloseOutlined
          onClick={(e) => {
            handleDelete(props.user);
            e.stopPropagation();
          }}
        />
      </Space>
    </div>
  );
};
export default Menu;
