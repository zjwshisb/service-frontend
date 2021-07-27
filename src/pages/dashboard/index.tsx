import React from 'react';
import { Space } from 'antd';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { getOnlineInfo, getQueryInfo } from '@/services/dashboard';
import { Line } from '@ant-design/charts';

const Index = () => {
  const [queryInfo, setQueryInfo] = React.useState<API.Dashboard.QueryInfo>();

  const [onlineInfo, setOnlineInfo] = React.useState<API.Dashboard.OnlineInfo>();

  React.useEffect(() => {
    getQueryInfo().then((res) => {
      setQueryInfo(res.data);
    });
  }, []);

  React.useEffect(() => {
    getOnlineInfo().then((res) => {
      setOnlineInfo(res.data);
    });
    const i = setInterval(() => {
      getOnlineInfo().then((res) => {
        setOnlineInfo(res.data);
      });
    }, 10000);
    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <ProCard split="vertical">
      <ProCard split="horizontal" colSpan={12}>
        {onlineInfo && (
          <ProCard colSpan={24}>
            <StatisticCard
              title={<span>在线用户</span>}
              statistic={{
                value: onlineInfo.user_count,
                prefix: '',
                status: 'processing',
              }}
              colSpan={8}
            />
            <StatisticCard
              title={<span>待回复用户</span>}
              statistic={{
                value: onlineInfo.waiting_user_count,
                prefix: '',
                status: 'error',
              }}
              colSpan={8}
            />
            <StatisticCard
              title={<span>在线客服</span>}
              statistic={{
                value: onlineInfo.admin_count,
                prefix: '',
                status: 'success',
              }}
              colSpan={8}
            />
          </ProCard>
        )}
        {queryInfo && (
          <ProCard split={'horizontal'} colSpan={24}>
            <ProCard split={'vertical'} colSpan={24}>
              <StatisticCard
                colSpan={12}
                title={<span>今日咨询用户人次</span>}
                statistic={{
                  value: queryInfo.user_count,
                  prefix: '',
                  description: (
                    <Space>
                      <StatisticCard.Statistic title="发送消息数" value={queryInfo.message_count} />
                    </Space>
                  ),
                }}
              />
              <StatisticCard
                colSpan={12}
                title={<span>平均等待时间(秒)</span>}
                statistic={{
                  value: queryInfo.avg_time,
                  prefix: '',
                  description: (
                    <Space>
                      <StatisticCard.Statistic
                        title="最大等待时间(秒)"
                        value={queryInfo.max_time}
                      />
                    </Space>
                  ),
                }}
              />
            </ProCard>
            <ProCard colSpan={24}>
              <StatisticCard
                title={<span>小时接待数</span>}
                colSpan={24}
                chart={
                  <Line
                    data={queryInfo.chart}
                    xField={'label'}
                    yField={'count'}
                    seriesField={'category'}
                    xAxis={{
                      label: {
                        formatter(y) {
                          return `${y}时`;
                        },
                      },
                    }}
                  />
                }
              />
            </ProCard>
          </ProCard>
        )}
      </ProCard>
      <ProCard />
    </ProCard>
  );
};

export default Index;
