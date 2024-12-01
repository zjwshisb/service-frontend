import React, { useState } from 'react';
import { AuditOutlined } from '@ant-design/icons/lib';
import { useModel } from '@umijs/max';
import DraggableView from '@/components/DraggableView';
import { Descriptions, Empty } from 'antd';
import { getUserInfo } from '@/services';
import MenuItem from '../MenuItem';

const Index = () => {
  const { current } = useModel('chat.currentUser');
  const [info, setInfo] = useState<Record<string, any>>({});

  React.useEffect(() => {
    if (current?.id) {
      getUserInfo(current.id).then((res) => {
        setInfo(res.data);
      });
    } else {
      setInfo({});
    }
  }, [current?.id]);

  return (
    <DraggableView
      title={'用户信息'}
      defaultVisible={false}
      top="300px"
      trigger={(visible) => (
        <MenuItem title={'用户信息'} active={visible}>
          <AuditOutlined />
        </MenuItem>
      )}
    >
      <div>
        {Object.keys(info).length > 0 && (
          <Descriptions column={1} bordered size={'small'}>
            <Descriptions.Item label={'用户名称'}>{info.username}</Descriptions.Item>
          </Descriptions>
        )}
        {Object.keys(info).length <= 0 && <Empty />}
      </div>
    </DraggableView>
  );
};
export default Index;
