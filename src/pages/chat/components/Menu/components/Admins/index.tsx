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
    dataIndex: 'accepted_count',
    title: '当前接待',
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
            dataSource={admins}
            pagination={false}
            columns={columns}
          />
        </Drawer>
        <CustomerServiceFilled className={styles.icon} data-active={visible} />
      </div>
    );
  }, [admins, visible]);
};
export default Index;
