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
      <Upload path={'message'} corp={false} />
    </ProForm.Item>
  );
};
export default Index;
