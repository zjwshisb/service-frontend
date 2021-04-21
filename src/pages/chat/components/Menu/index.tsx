import React from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import ChangeAvatar from './components/ChangeAvatar/index';
import styles from './index.less';

const Index = () => {
  const menu = (
    <Menu>
      <Menu.Item key="avatar">
        <ChangeAvatar />
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.index}>
      <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
        <Avatar shape="square" className={styles.avatar}>
          aa
        </Avatar>
      </Dropdown>
    </div>
  );
};
export default Index;
