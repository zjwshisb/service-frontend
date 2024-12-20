import { StatisticCard } from '@ant-design/pro-components';
import React from 'react';
import { useRequest } from '@umijs/max';
import { getAdminInfo } from '@/services/dashboard';
import { Icon } from '@iconify/react';

const Index: React.FC = () => {
  const { data, run } = useRequest(getAdminInfo);

  React.useEffect(() => {
    const i = setInterval(() => run(), 10 * 1000);
    return () => {
      clearInterval(i);
    };
  }, [run]);

  return (
    <StatisticCard
      footer={<div className={'border-t mt-4'}>客服总数: {data?.total}</div>}
      statistic={{
        title: '在线客服',
        value: data?.admins.length,
        icon: <Icon className={'text-2xl'} icon={'tdesign:service'}></Icon>,
      }}
    ></StatisticCard>
  );
};

export default Index;
