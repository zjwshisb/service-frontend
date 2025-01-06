import React, { useState } from 'react';
import { AuditOutlined } from '@ant-design/icons/lib';
import { useModel } from '@umijs/max';
import DraggableView from '@/components/DraggableView';
import { Descriptions, Empty } from 'antd';
import { getUserInfo } from '@/services';
import Wrapper from './Wrapper';
import { Else, If, Then } from 'react-if';

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
      <div className={'w-48'}>
        <If condition={info.length === 0}>
          <Then>
            <Empty description={'请选择一个用户'} className={'mt-4'}></Empty>
          </Then>
          <Else>
            <Descriptions column={1} bordered className={'border-none'} size={'small'}>
              {info.map((v) => {
                return (
                  <Descriptions.Item key={v.name} label={v.label}>
                    {v.description}
                  </Descriptions.Item>
                );
              })}
            </Descriptions>
          </Else>
        </If>
      </div>
    </DraggableView>
  );
};
export default UserInfo;
