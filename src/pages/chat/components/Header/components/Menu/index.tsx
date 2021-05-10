import React from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import ChangeAvatar from './components/ChangeAvatar/index';
import styles from './index.less';
import { useModel } from '@@/plugin-model/useModel';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons/lib';

const Index = () => {
  const initialState = useModel('@@initialState');

  const [menuVisible, setMenuVisible] = React.useState(false);

  return React.useMemo(() => {
    return (
      <div className={styles.index}>
        <Dropdown
          onVisibleChange={setMenuVisible}
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
          <span className={styles.menu}>
            <Avatar
              src={initialState.initialState?.currentUser?.avatar}
              shape="square"
              className={styles.avatar}
            >
              {initialState.initialState?.currentUser?.username}
            </Avatar>
            {menuVisible ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </span>
        </Dropdown>
      </div>
    );
  }, [
    initialState.initialState?.currentUser?.avatar,
    initialState.initialState?.currentUser?.username,
    menuVisible,
  ]);
};
export default Index;
