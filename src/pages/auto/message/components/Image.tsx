import React from 'react';
import ProForm from '@ant-design/pro-form';
import Upload from '@/components/Upload/index';

const Index = () => {
  return (
    <ProForm.Item rules={[{ required: true }]} name={'content'} label={'图片'} required={true}>
      <Upload action={`${BASE_URL}/auto-message/image`} corp={false} />
    </ProForm.Item>
  );
};
export default Index;
