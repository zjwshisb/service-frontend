import React, { useState } from 'react';
import { useModel } from '@umijs/max';
import classNames from 'classnames';
import { getUserInfo } from '@/services';
import { Else, If, Then } from 'react-if';
import { Avatar, Descriptions, Empty } from 'antd';
import CusDiv from '@/components/CusDiv';

const Index: React.FC = () => {
  const { current, detailShow } = useModel('chat.currentUser');

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
    <CusDiv
      className={classNames(
        'absolute left-[1080px] bg-[#f3f3f3] border-l transition-all h-full overflow-hidden box-border pt-2',
        {
          'w-56': detailShow,
          'w-0': !detailShow,
        },
      )}
    >
      <div className={'w-56 p-2'}>
        <If condition={info.length === 0}>
          <Then>
            <Empty description={'请选择一个用户'} className={'mt-4'}></Empty>
          </Then>
          <Else>
            <Avatar src={current?.avatar} shape={'square'} size={'large'}>
              {current?.username}
            </Avatar>
            <Descriptions column={1} className={'mt-2 w-52'} layout={'vertical'} size={'small'}>
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
    </CusDiv>
  );
};
export default Index;
