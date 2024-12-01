import React from 'react';
import { CustomerServiceFilled } from '@ant-design/icons/lib';
import { useModel } from '@umijs/max';
import { Avatar, Drawer, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import MenuItem from '../MenuItem';

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
  const { admins, setAdmins } = useModel('chat.admins');

  const setOnMessage = useModel('chat.websocket', (model) => model.setOnMessage);

  React.useEffect(() => {
    setOnMessage((action: API.Action<API.Admin[]>) => {
      setAdmins(action.data);
    }, 'admins');
  }, [setOnMessage, setAdmins]);

  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <MenuItem title={'在线客服'} onClick={() => setVisible(true)} active={visible}>
        <CustomerServiceFilled />
      </MenuItem>
      <Drawer
        open={visible}
        placement={'right'}
        styles={{
          body: {
            padding: 0,
          },
        }}
        width={400}
        onClose={(e) => {
          setVisible(false);
          e.stopPropagation();
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
    </>
  );
};
export default Index;
