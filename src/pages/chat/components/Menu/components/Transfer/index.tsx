import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons/lib';
import { useModel } from '@@/plugin-model/useModel';
import { Badge, Table, Button, Space } from 'antd';
import styles from '../index.less';
import DraggableView from '@/components/DraggableView';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import useAcceptUser from '@/hooks/useAcceptUser';

const Index = () => {
  const { setOnMessage } = useModel('useWebsocketModel');
  const { transfers, setTransfers } = useModel('useTransferModel');

  const handleAccept = useAcceptUser();

  React.useEffect(() => {
    setOnMessage((action: API.Action<API.Transfer[]>) => {
      if (action.action === 'user-transfer') {
        setTransfers(action.data);
      }
    }, 'user-transfer');
  }, [setOnMessage, setTransfers]);

  const columns = React.useMemo((): ColumnsType<API.Transfer> => {
    return [
      {
        title: '#',
        render(value, _, index) {
          return index + 1;
        },
      },
      {
        dataIndex: 'created_at',
        title: '转接时间',
        render(value) {
          return moment(value * 1000).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      {
        dataIndex: 'from_admin_name',
        title: '来源',
      },
      {
        dataIndex: 'username',
        title: '用户',
      },
      {
        dataIndex: 'id',
        title: '操作',
        render(value, record) {
          return (
            <Space>
              <Button size={'small'} type={'primary'} onClick={() => handleAccept(record.user_id)}>
                接入
              </Button>
              <Button size={'small'}>详情</Button>
            </Space>
          );
        },
      },
    ];
  }, [handleAccept]);

  return React.useMemo(() => {
    return (
      <DraggableView
        top={'500px'}
        width={'600px'}
        title={'转接用户'}
        defaultVisible={false}
        trigger={(visible) => (
          <div className={styles.item}>
            <Badge count={transfers.length} size={'small'}>
              <InfoCircleOutlined className={styles.icon} data-active={visible} />
            </Badge>
          </div>
        )}
      >
        <Table dataSource={transfers} columns={columns} size={'small'} pagination={false} />
      </DraggableView>
    );
  }, [columns, transfers]);
};
export default Index;
