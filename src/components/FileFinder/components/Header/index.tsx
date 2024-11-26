import React from 'react';
import NewDir from './components/NewDir';
import UploadFile from './components/UploadFile';
import { Button, Input, Space } from 'antd';
import { useModel } from '@umijs/max';
import { Icon } from '@iconify/react';
import Compact from 'antd/es/space/Compact';

const Header: React.FC = () => {
  const { lastDir, back, backLength, forward, forwardLength, refresh, setFilter, filter } =
    useModel('fileModel');
  return (
    <div className={'px-6 pt-3'}>
      <Space>
        <Compact>
          <Button size={'small'} type={'text'} onClick={back} disabled={backLength === 0}>
            <Icon icon={'ep:back'}></Icon>
          </Button>
          <Button size={'small'} type={'text'} onClick={forward} disabled={forwardLength === 0}>
            <Icon icon={'ep:right'}></Icon>
          </Button>
          <Button size={'small'} type={'text'} onClick={refresh}>
            <Icon icon={'mdi:reload'}></Icon>
          </Button>
        </Compact>
        <Input.Search
          placeholder={'当前目录下搜索'}
          allowClear={true}
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          className={'w-96'}
          addonBefore={lastDir ? lastDir.path.replaceAll('/', '>') : ''}
        />
        <NewDir />
        <UploadFile />
      </Space>
    </div>
  );
};
export default Header;
