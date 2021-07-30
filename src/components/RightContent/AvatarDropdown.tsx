import React from 'react';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState } = useModel('@@initialState');

  // const onMenuClick = useCallback(
  //   (event: {
  //     key: React.Key;
  //     keyPath: React.Key[];
  //     item: React.ReactInstance;
  //     domEvent: React.MouseEvent<HTMLElement>;
  //   }) => {
  //     const { key } = event;
  //     history.push(`/account/${key}`);
  //   },
  //   [],
  // );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.username) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} alt="avatar" src={currentUser.avatar}>
          {currentUser.username}
        </Avatar>
        <span className={`${styles.name} anticon`}>{currentUser.username}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
