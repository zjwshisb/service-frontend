import React from 'react';
import { useModel } from '@umijs/max';
import { Drawer, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Wrapper from './Wrapper';
import { CheckOutlined, CloseOutlined, CustomerServiceFilled } from '@ant-design/icons';

const columns: ColumnsType<API.Admin> = [
  {
    dataIndex: 'username',
    title: '客服',
  },
  {
    dataIndex: 'accepted_count',
    title: '当前接待',
  },
  {
    dataIndex: 'online',
    title: '在线',
    render(val) {
      return (
        <div>
          {val ? (
            <CheckOutlined className={'text-green-600'} />
          ) : (
            <CloseOutlined className={'text-red-600'} />
          )}
        </div>
      );
    },
  },
];

const Admins = () => {
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
      <Wrapper onClick={() => setVisible(true)} active={visible}>
        <CustomerServiceFilled />
      </Wrapper>
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
export default Admins;
