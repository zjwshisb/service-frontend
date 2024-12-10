import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { getChatSessionDetail } from '@/services';
import { Descriptions } from 'antd';
import MessageLine from '@/components/MessageLine/index';
import { When } from 'react-if';
import { DescriptionsItemType } from 'antd/es/descriptions';

const Index = () => {
  const { id = '0' } = useParams<{ id: string }>();

  const { data, loading } = useRequest(() => getChatSessionDetail(id));

  const items: DescriptionsItemType[] = React.useMemo(() => {
    if (!data) {
      return [];
    }
    const i: DescriptionsItemType[] = [
      {
        label: '用户',
        children: data?.session.username,
      },
      {
        label: '询问时间',
        children: data?.session.queried_at,
      },
    ];
    if (data.session.admin_name) {
      i.push({
        label: '客服',
        children: data.session.admin_name,
      });
    }
    if (data.session.accepted_at) {
      i.push({
        label: '接入时间',
        children: data.session.accepted_at,
      });
    }
    if (data.session.broken_at) {
      i.push({
        label: '断开时间',
        children: data.session.broken_at,
      });
    }
    if (data.session.canceled_at) {
      i.push({
        label: '取消时间',
        children: data.session.canceled_at,
      });
    }
    return i;
  }, [data]);

  return (
    <PageContainer loading={loading}>
      <When condition={!!data}>
        {() => (
          <ProCard split="vertical">
            <ProCard colSpan={15}>
              <MessageLine messages={data?.messages || []} />
            </ProCard>
            <ProCard colSpan={9}>
              <Descriptions column={1} items={items}></Descriptions>
            </ProCard>
          </ProCard>
        )}
      </When>
    </PageContainer>
  );
};
export default Index;
