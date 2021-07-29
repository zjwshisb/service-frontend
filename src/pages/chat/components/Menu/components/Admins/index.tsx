import React from 'react';
import { CustomerServiceFilled } from '@ant-design/icons/lib';
import { useModel } from '@@/plugin-model/useModel';
import { Drawer, Table, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from '../index.less';

const columns: ColumnsType<API.Admin> = [
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
  const { admins, setAdmins } = useModel('useAdminModel');

  const setOnMessage = useModel('useWebsocketModel', (model) => model.setOnMessage);

  React.useEffect(() => {
    setOnMessage((action: API.Action<API.Admin[]>) => {
      setAdmins(action.data);
    }, 'admins');
  }, [setOnMessage, setAdmins]);

  const sortUsers = React.useMemo(() => {
    return admins.sort((a, b) => {
      if (a.online && !b.online) {
        return -1;
      }
      if (a.online === b.online) {
        // return a.today_accept_count > b.today_accept_count ? -1 : 1;
      }
      return 1;
    });
  }, [admins]);

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
          <Table<API.Admin>
            rowKey={'id'}
            size={'small'}
            dataSource={sortUsers}
            pagination={false}
            columns={columns}
          />
        </Drawer>
        <CustomerServiceFilled className={styles.icon} data-active={visible} />
      </div>
    );
  }, [sortUsers, visible]);
};
export default Index;
