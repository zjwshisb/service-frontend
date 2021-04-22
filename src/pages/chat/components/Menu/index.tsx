import React from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import ChangeAvatar from './components/ChangeAvatar/index';
import styles from './index.less';
import { useModel } from '@@/plugin-model/useModel';

const Index = () => {
  const initialState = useModel('@@initialState');

  return React.useMemo(() => {
    return (
      <div className={styles.index}>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="avatar">
                <ChangeAvatar />
              </Menu.Item>
            </Menu>
          }
          placement="bottomRight"
          trigger={['click']}
        >
          <Avatar
            src={initialState.initialState?.currentUser?.avatar}
            shape="square"
            className={styles.avatar}
          >
            {initialState.initialState?.currentUser?.username}
          </Avatar>
        </Dropdown>
      </div>
    );
  }, [
    initialState.initialState?.currentUser?.avatar,
    initialState.initialState?.currentUser?.username,
  ]);
};
export default Index;
