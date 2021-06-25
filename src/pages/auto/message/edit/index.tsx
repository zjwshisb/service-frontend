import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { fetchAutoMessage, updateAutoMessage } from '@/services/auto';
import AutoMessageForm from '../components/Form';
import { useParams } from 'umi';
import { message } from 'antd';
import { history } from '@@/core/history';
import type { MessageNavigator } from '@/pages/auto/message';

const Index: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [initialValues, setInitialValues] = React.useState<FORM.AutoMessageForm | undefined>();

  React.useEffect(() => {
    fetchAutoMessage(id).then((res) => {
      const form: FORM.AutoMessageForm = {
        name: res.data.name,
        content: '',
        url: '',
        title: '',
        type: res.data.type,
      };
      let navigator: MessageNavigator;
      switch (res.data.type) {
        case 'text':
        case 'image':
          form.content = res.data.content;
          break;
        case 'navigator':
          navigator = JSON.parse(res.data.content);
          form.title = navigator.title;
          form.content = navigator.content;
          form.url = navigator.url;
          break;
        default:
      }
      setInitialValues(form);
    });
  }, [id]);

  const submit = React.useCallback(
    async (data) => {
      return updateAutoMessage(data, id).then(() => {
        message.success('修改成功');
        history.goBack();
      });
    },
    [id],
  );

  return (
    <PageContainer>
      <ProCard layout={'center'}>
        <AutoMessageForm submit={submit} initialValues={initialValues} readonlyValues={['type']} />
      </ProCard>
    </PageContainer>
  );
};

export default Index;
