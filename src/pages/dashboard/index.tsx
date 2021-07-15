import React from 'react';
import { Space } from 'antd';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { getQueryInfo } from '@/services/dashboard';

const Index = () => {
  React.useEffect(() => {
    getQueryInfo();
  }, []);

  return (
    <ProCard split="vertical">
      <ProCard split={'horizontal'} colSpan={12}>
        <ProCard split={'vertical'} colSpan={24}>
          <StatisticCard
            colSpan={12}
            title={<span>今日咨询用户数量</span>}
            statistic={{
              value: 200,
              prefix: '',
              description: (
                <Space>
                  <StatisticCard.Statistic title="发送消息" value="6000" />
                </Space>
              ),
            }}
          />
          <StatisticCard
            colSpan={12}
            title={<span>今日接受消息数</span>}
            statistic={{
              value: 200,
              prefix: '',
              description: (
                <Space>
                  <StatisticCard.Statistic title="发送消息" value="6000" />
                </Space>
              ),
            }}
          />
        </ProCard>
        <ProCard colSpan={24}>
          <StatisticCard
            title={<span>今日接待数</span>}
            statistic={{
              value: 200,
              prefix: '',
              description: (
                <Space>
                  <StatisticCard.Statistic title="回复消息" value="539" />
                </Space>
              ),
            }}
            colSpan={12}
          />
        </ProCard>
      </ProCard>

      <StatisticCard
        title={<span>平均响应时间(秒)</span>}
        statistic={{
          value: 355,
          prefix: '',
          description: (
            <Space>
              <StatisticCard.Statistic title="最大响应时间(秒)" value="355" />
              <StatisticCard.Statistic title="最小响应时间(秒)" value="355" />
            </Space>
          ),
        }}
        colSpan={24}
      />
    </ProCard>
  );
};

export default Index;
