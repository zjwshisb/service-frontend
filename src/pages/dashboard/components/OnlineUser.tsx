import { StatisticCard } from '@ant-design/pro-components';
import React from 'react';
import { useRequest } from '@umijs/max';
import { getOnlineUserInfo } from '@/services/dashboard';
import { Icon } from '@iconify/react';

const Index: React.FC = () => {
  const { data, run, loading } = useRequest(getOnlineUserInfo);

  React.useEffect(() => {
    const i = setInterval(() => run(), 10 * 1000);
    return () => {
      clearInterval(i);
    };
  }, [run]);

  return (
    <StatisticCard
      footer={<div className={'border-t pt-3'}>今日活跃: {data?.active_count}</div>}
      statistic={{
        loading,
        title: '在线用户',
        value: data?.users.length,
        icon: <Icon className={'text-2xl'} icon={'tdesign:user'}></Icon>,
      }}
    ></StatisticCard>
  );
};

export default Index;
