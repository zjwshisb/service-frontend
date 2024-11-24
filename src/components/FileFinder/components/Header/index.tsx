import React from 'react';
import NewDir from './components/NewDir';
import UploadFile from './components/UploadFile';
import { Space } from 'antd';

const Header: React.FC = () => {
  return (
    <div className={'px-6 pt-3 flex'}>
      <Space>
        <NewDir />
        <UploadFile />
      </Space>
    </div>
  );
};
export default Header;
