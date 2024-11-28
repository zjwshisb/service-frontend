import React from 'react';
import { PageContainer, ProForm, ProFormSelect, ProCard } from '@ant-design/pro-components';
import { getSystemAutoRule, updateSystemAutoRule } from '@/services/auto';
import { message, Button } from 'antd';
import { useModel, useRequest } from '@umijs/max';

const Index = () => {
  const [edit, setEdit] = React.useState(false);

  const { getOptions } = useModel('optionModel');

  const { data: rules, loading } = useRequest(getSystemAutoRule);
  return (
    <PageContainer>
      <ProCard layout={'center'} loading={loading}>
        <ProForm
          className={'w-full'}
          submitter={{
            render: (_, doms) => {
              if (edit) {
                return [...doms];
              }
              return [
                <Button key={'edit'} type={'primary'} onClick={() => setEdit(true)}>
                  编辑
                </Button>,
              ];
            },
          }}
          onFinish={async (data) => {
            return updateSystemAutoRule(data).then(() => {
              message.success('修改成功').then();
              setEdit(false);
            });
          }}
        >
          {rules?.map((v) => {
            return (
              <ProFormSelect
                disabled={!edit}
                initialValue={v.message_id && v.message_id > 0 ? v.message_id : undefined}
                key={v.id}
                label={v.name}
                name={v.id}
                request={() => getOptions('auto-messages')}
              />
            );
          })}
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};
export default Index;
