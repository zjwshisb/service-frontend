import React from 'react';
import { DatePicker, Descriptions } from 'antd';
import { getAdminDetail } from '@/services';
import { useParams } from '@umijs/max';
import { ProCard, PageContainer } from '@ant-design/pro-components';
import dayjs from 'dayjs';
const Index = () => {
  const [month, setMonth] = React.useState<dayjs.Dayjs | null>(dayjs());
  const { id = 0 } = useParams<{ id: string }>();
  const [info, setInfo] = React.useState<{ chart: API.Line[]; admin: API.Admin } | undefined>();

  React.useEffect(() => {
    getAdminDetail(id, {
      month: month?.format('YYYY-MM-DD'),
    }).then((res) => {
      setInfo(res.data);
    });
  }, [id, month]);

  return (
    <PageContainer>
      {info && (
        <ProCard split="vertical">
          <ProCard
            colSpan={18}
            title={
              <DatePicker
                value={month}
                picker={'month'}
                format={'YYYY-MM'}
                // onSelect={(e: string) => {
                //   setMonth(e);
                // }}
              />
            }
          >
            {/*<Line data={info.chart} xField={'label'} yField={'value'} seriesField={'category'} />*/}
          </ProCard>
          <ProCard colSpan={6}>
            <Descriptions column={1}>
              <Descriptions.Item label="客服">{info.admin.username}</Descriptions.Item>
              <Descriptions.Item label="在线">{info.admin.online ? '是' : '否'}</Descriptions.Item>
              <Descriptions.Item label="当前接待">{info.admin.accepted_count}</Descriptions.Item>
            </Descriptions>
          </ProCard>
        </ProCard>
      )}
    </PageContainer>
  );
};
export default Index;
