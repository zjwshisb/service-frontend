import React from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import Upload from '@/components/Upload/index';

const Index = () => {
  return (
    <React.Fragment>
      <ProFormText
        rules={[{ required: true, max: 32 }]}
        name={'title'}
        label={'卡片标题'}
        required={true}
      />
      <ProFormText
        rules={[{ required: true, max: 512 }]}
        name={'url'}
        label={'跳转路径'}
        required={true}
      />
      <ProForm.Item
        rules={[{ required: true }]}
        name={'content'}
        label={'卡片图片'}
        required={true}
      >
        <Upload action={`${BASE_URL}/auto-message/image`} corp={false} />
      </ProForm.Item>
    </React.Fragment>
  );
};
export default Index;
