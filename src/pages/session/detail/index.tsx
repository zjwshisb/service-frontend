import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'umi';
import { getChatSessionDetail } from '@/services';
import { Descriptions } from 'antd';
import ProCard from '@ant-design/pro-card';
import moment from 'moment';
import MessageLine from '@/components/MessageLine/index';

const Index = () => {
  const { id } = useParams<{ id: string }>();

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
              <Descriptions.Item label="询问时间">
                {moment(info.session.queried_at).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
              <Descriptions.Item label="接入时间">
                {moment(info.session.accepted_at).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
              <Descriptions.Item label="总消息数">{info.total}</Descriptions.Item>
            </Descriptions>
          </ProCard>
        </ProCard>
      )}
    </PageContainer>
  );
};
export default Index;
