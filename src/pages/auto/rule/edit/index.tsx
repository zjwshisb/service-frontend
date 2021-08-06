import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import RuleForm from '../components/Form';
import { message } from 'antd';
import { history } from '@@/core/history';
import { showAutoRule, updateAutoRule } from '@/services/auto';
import { useParams } from 'umi';

const Index = () => {
  const [initialValues, setInitialValues] = React.useState<FORM.AutoRuleForm | undefined>();

  const { id } = useParams<{ id: string }>();

  const submit = React.useCallback(
    async (data) => {
      return updateAutoRule(data, id)
        .then(() => {
          message.success('操作成功');
          history.goBack();
        })
        .catch();
    },
    [id],
  );

  React.useEffect(() => {
    showAutoRule(id).then((res) => {
      setInitialValues({
        name: res.data.name,
        match: res.data.name,
        match_type: res.data.match_type,
        reply_type: res.data.reply_type,
        sort: res.data.sort,
        is_open: res.data.is_open,
        message_id: res.data.message_id,
        key: res.data.key,
        scenes: res.data.scenes,
      });
    });
  }, [id]);

  return (
    <PageContainer>
      <ProCard layout={'center'}>
        <RuleForm submit={submit} initialValues={initialValues} />
      </ProCard>
    </PageContainer>
  );
};

export default Index;
