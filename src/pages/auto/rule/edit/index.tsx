import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import RuleForm from '../components/Form';
import { message } from 'antd';
import { history } from '@@/core/history';
import { showAutoRule, updateAutoRule } from '@/services/auto';
import { useParams } from '@umijs/max';

const Index = () => {
  const [initialValues, setInitialValues] = React.useState<FORM.AutoRuleForm | undefined>();

  const { id = '0' } = useParams<{ id: string }>();

  const submit = React.useCallback(
    async (data: Record<string, any>) => {
      return updateAutoRule(data as FORM.AutoRuleForm, id)
        .then(() => {
          message.success('操作成功');
          history.back();
        })
        .catch();
    },
    [id],
  );

  React.useEffect(() => {
    showAutoRule(id).then((res) => {
      setInitialValues({
        name: res.data.name,
        match: res.data.match,
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
