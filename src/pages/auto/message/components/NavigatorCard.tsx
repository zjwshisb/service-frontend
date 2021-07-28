import React from 'react';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import Upload from '@/components/Upload/index';

const options = [
  {
    label: '首页',
    value: '/pages/index/index',
  },
];
const Index = () => {
  return (
    <React.Fragment>
      <ProFormText
        rules={[{ required: true, max: 32 }]}
        name={'title'}
        label={'卡片标题'}
        required={true}
      />
      <ProFormSelect
        rules={[{ required: true, message: '请选择跳转路径' }]}
        options={options}
        name={'url'}
        label={'跳转路径'}
        required={true}
      />
      <ProForm.Item
        tooltip={'大小建议200x100'}
        rules={[{ required: true, message: '请选择图片' }]}
        name={'content'}
        label={'卡片图片'}
        required={true}
      >
        <Upload
          action={`${BASE_URL}/auto-messages/image`}
          corp={false}
          width={'200px'}
          height={'100px'}
        />
      </ProForm.Item>
    </React.Fragment>
  );
};
export default Index;
