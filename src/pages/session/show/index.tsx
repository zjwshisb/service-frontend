import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { getChatSessionDetail } from '@/services';
import { Descriptions } from 'antd';
import MessageLine from '@/components/MessageLine/index';
import { If, Then } from 'react-if';

const Index = () => {
  const { id = '0' } = useParams<{ id: string }>();

  const { data, loading } = useRequest(() => getChatSessionDetail(id));

  return (
    <PageContainer loading={loading}>
      <If condition={!!data}>
        <Then>
          {() => (
            <ProCard split="vertical">
              <ProCard colSpan={15}>
                <MessageLine messages={data?.messages || []} />
              </ProCard>
              <ProCard colSpan={9}>
                <Descriptions column={1}>
                  <Descriptions.Item label="用户">{data?.session.username}</Descriptions.Item>
                  {data?.session.admin_name && (
                    <Descriptions.Item label="客服">{data?.session.admin_name}</Descriptions.Item>
                  )}
                  <Descriptions.Item label="询问时间">{data?.session.queried_at}</Descriptions.Item>
                  <Descriptions.Item label="接入时间">
                    {data?.session.accepted_at}
                  </Descriptions.Item>
                  {data?.session.broken_at && (
                    <Descriptions.Item label="断开时间">
                      {data?.session.broken_at}
                    </Descriptions.Item>
                  )}
                  {data?.session.canceled_at && (
                    <Descriptions.Item label="取消时间">
                      {data?.session.canceled_at}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </ProCard>
            </ProCard>
          )}
        </Then>
      </If>
    </PageContainer>
  );
};
export default Index;
