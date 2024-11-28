import React from 'react';
import { ProFormText, ProFormSelect } from '@ant-design/pro-components';
import ProFormFileSelect from '@/components/ProFormFileSelect';

const options = [
  {
    label: '首页',
    value: '/pages/index/index',
  },
];
const NavigatorCard = () => {
  return (
    <React.Fragment>
      <ProFormText
        rules={[{ required: true, max: 32 }]}
        name={['navigator', 'title']}
        label={'卡片标题'}
        required={true}
      />
      <ProFormSelect
        rules={[{ required: true, max: 512 }]}
        options={options}
        name={['navigator', 'url']}
        label={'跳转路径'}
        required={true}
      />
      <ProFormFileSelect
        tooltip={'大小建议200x100'}
        rules={[{ required: true, message: '请选择图片' }]}
        name={['navigator', 'image']}
        label={'卡片图片'}
        required={true}
        fieldProps={{
          type: 'image',
          width: '200px',
          height: '100px',
        }}
      ></ProFormFileSelect>
    </React.Fragment>
  );
};
export default NavigatorCard;
