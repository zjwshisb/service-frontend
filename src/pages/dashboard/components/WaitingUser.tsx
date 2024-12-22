import { StatisticCard } from '@ant-design/pro-components';
import React from 'react';
import { useRequest } from '@umijs/max';
import { Icon } from '@iconify/react';
import { getWaitingUserInfo } from '@/services/dashboard';

const Index: React.FC = () => {
  const { data, run } = useRequest(getWaitingUserInfo);

  React.useEffect(() => {
    const i = setInterval(() => run(), 10 * 1000);
    return () => {
      clearInterval(i);
    };
  }, [run]);

  return (
    <StatisticCard
      footer={<div className={'border-t pt-3'}>今日总咨询用户数: {data?.today_total}</div>}
      statistic={{
        title: '待接入用户',
        value: data?.users.length,
        icon: <Icon className={'text-2xl'} icon={'guidance:waiting-room'}></Icon>,
      }}
    ></StatisticCard>
  );
};

export default Index;
