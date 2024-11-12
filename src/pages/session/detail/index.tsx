import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { getChatSessionDetail } from '@/services';
import { Descriptions } from 'antd';
import MessageLine from '@/components/MessageLine/index';

const Index = () => {
  const { id = '0' } = useParams<{ id: string }>();

  const [info, setInfo] = React.useState<{
    messages: API.Message[];
    session: API.ChatSession;
    total: number;
  }>();

  React.useEffect(() => {
    getChatSessionDetail(id).then((res) => {
      setInfo(res.data);
    });
  }, [id]);

  return (
    <PageContainer>
      {info && (
        <ProCard split="vertical">
          <ProCard colSpan={15}>
            <MessageLine messages={info.messages} />
          </ProCard>
          <ProCard colSpan={9}>
            <Descriptions column={1}>
              <Descriptions.Item label="用户">{info.session.user_name}</Descriptions.Item>
              <Descriptions.Item label="客服">{info.session.admin_name}</Descriptions.Item>
              <Descriptions.Item label="询问时间">{info.session.queried_at}</Descriptions.Item>
              <Descriptions.Item label="接入时间">{info.session.accepted_at}</Descriptions.Item>
              <Descriptions.Item label="总消息数">{info.total}</Descriptions.Item>
            </Descriptions>
          </ProCard>
        </ProCard>
      )}
    </PageContainer>
  );
};
export default Index;
