import React from 'react';
import ProForm from '@ant-design/pro-form';
import Upload from '@/components/Upload/index';

const Index = () => {
  return (
    <ProForm.Item
      rules={[{ required: true, message: '请选择图片' }]}
      name={'content'}
      label={'图片'}
      required={true}
    >
      <Upload action={`${BASE_URL}/auto-messages/image`} corp={false} />
    </ProForm.Item>
  );
};
export default Index;
