import React from 'react';
import { CustomerServiceFilled } from '@ant-design/icons/lib';
import { useModel } from '@@/plugin-model/useModel';
import { Drawer, Table, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from '../index.less';

const columns: ColumnsType<APP.ServiceUser> = [
  {
    dataIndex: 'username',
    title: '客服',
    align: 'center',
    render(value, record) {
      return (
        <span>
          <Avatar src={record.avatar} />
          {value}
        </span>
      );
    },
  },
  {
    dataIndex: 'online',
    title: '状态',
    align: 'center',
    render(value) {
      if (value) {
        return <span>在线</span>;
      }
      return <span>离线</span>;
    },
  },
  {
    dataIndex: 'today_accept_count',
    align: 'center',
    title: '今日接待数',
  },
];

const Index = () => {
  const { users, setUsers } = useModel('useServiceUserModel');

  const setOnMessage = useModel('useWebsocketModel', (model) => model.setOnMessage);

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.ServiceUser[]>) => {
      setUsers(action.data);
    }, 'service-users');
  }, [setOnMessage, setUsers]);

  const sortUsers = React.useMemo(() => {
    return users.sort((a, b) => {
      if (a.online && !b.online) {
        return -1;
      }
      if (a.online === b.online) {
        return a.today_accept_count > b.today_accept_count ? -1 : 1;
      }
      return 1;
    });
  }, [users]);

  const [visible, setVisible] = React.useState(false);

  return React.useMemo(() => {
    return (
      <div className={styles.item} onClick={() => setVisible(true)} data-active={visible}>
        <Drawer
          visible={visible}
          placement={'right'}
          bodyStyle={{ padding: 0 }}
          width={400}
          onClose={(e) => {
            e.stopPropagation();
            setVisible(false);
          }}
        >
          <Table<APP.ServiceUser>
            rowKey={'id'}
            size={'small'}
            dataSource={sortUsers}
            pagination={false}
            columns={columns}
          />
        </Drawer>
        <CustomerServiceFilled />
      </div>
    );
  }, [sortUsers, visible]);
};
export default Index;
