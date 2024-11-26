import React from 'react';
import { useModel } from '@umijs/max';
import Item from '../Item';
import { Empty as BasicEmpty, Spin, Divider } from 'antd';

const Container: React.FC = () => {
  const { files, loading } = useModel('fileModel');

  const Empty = () => {
    if (loading || files.length > 0) {
      return <></>;
    }
    return (
      <div className={'w-full h-full flex items-center justify-center'}>
        <BasicEmpty />
      </div>
    );
  };

  const NoMore = () => {
    if (files.length === 0) {
      return <></>;
    }
    return (
      <div className={'w-full px-4'}>
        <Divider plain={true} className={'text-sm'}>
          没有更多了
        </Divider>
      </div>
    );
  };

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
        <Empty />
        <NoMore />
      </div>
    </Spin>
  );
};
export default Container;
