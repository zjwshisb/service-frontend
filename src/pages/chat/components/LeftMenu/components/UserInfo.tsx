import React, { useState } from 'react';
import { AuditOutlined } from '@ant-design/icons/lib';
import { useModel } from '@umijs/max';
import DraggableView from '@/components/DraggableView';
import { Descriptions } from 'antd';
import { getUserInfo } from '@/services';
import Wrapper from './Wrapper';

const UserInfo = () => {
  const { current } = useModel('chat.currentUser');
  const [info, setInfo] = useState<API.UserInfoItem[]>([]);

  React.useEffect(() => {
    if (current?.id) {
      getUserInfo(current.id).then((res) => {
        setInfo(res.data);
      });
    } else {
      setInfo([]);
    }
  }, [current?.id]);

  return (
    <DraggableView
      title={'用户信息'}
      defaultVisible={false}
      top="300px"
      trigger={(visible) => (
        <Wrapper title={'用户信息'} active={visible}>
          <AuditOutlined />
        </Wrapper>
      )}
    >
      <div>
        <Descriptions column={1} bordered className={'border-none'} size={'small'}>
          {info.map((v) => {
            return (
              <Descriptions.Item key={v.name} label={v.label}>
                {v.description}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </div>
    </DraggableView>
  );
};
export default UserInfo;
