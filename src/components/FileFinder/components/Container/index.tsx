import React from 'react';
import { useModel } from '@umijs/max';
import Item from '../Item';
import { Empty, Spin, Divider } from 'antd';
import { When } from 'react-if';

const Container: React.FC = () => {
  const { files, loading } = useModel('fileModel');

  return (
    <Spin spinning={loading}>
      <div
        className={
          'h-[60vh] content-start items-start justify-start flex flex-wrap overflow-y-auto px-5 border-1'
        }
      >
        {files.map((v) => {
          return <Item file={v} key={v.id} />;
        })}
        <When condition={files.length === 0 && !loading}>
          <div className={'w-full h-full flex items-center justify-center'}>
            <Empty />
          </div>
        </When>
        <When condition={files.length !== 0 && !loading}>
          <div className={'w-full px-4'}>
            <Divider plain={true} className={'text-sm'}>
              没有更多了
            </Divider>
          </div>
        </When>
      </div>
    </Spin>
  );
};
export default Container;
