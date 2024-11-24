import React from 'react';
import { useModel } from '@umijs/max';
import Item from '../Item';

const Container: React.FC = () => {
  const { data } = useModel('fileModel');

  return (
    <div className={'h-[600px] flex flex-wrap overflow-y-scroll px-5 border-1'}>
      {data?.map((v) => {
        return <Item file={v} key={v.id} />;
      })}
    </div>
  );
};
export default Container;
