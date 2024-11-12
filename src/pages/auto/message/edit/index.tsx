import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { getAutoMessageForm, updateAutoMessage } from '@/services/auto';
import AutoMessageForm from '../components/Form';
import { useParams } from '@umijs/max';
import { message } from 'antd';
import { history } from '@@/core/history';

const Index: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [initialValues, setInitialValues] = React.useState<FORM.AutoMessageForm | undefined>();

  React.useEffect(() => {
    getAutoMessageForm(id as string).then((res) => {
      const form: FORM.AutoMessageForm = {
        name: res.data.name,
        content: '',
        url: '',
        title: '',
        type: res.data.type,
      };
      let navigator: API.NavigatorContent;
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
    async (data: Record<any, any>) => {
      return updateAutoMessage(data as FORM.AutoMessageForm, id as string).then(() => {
        message.success('修改成功');
        history.back();
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
