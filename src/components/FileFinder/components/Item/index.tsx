import React from 'react';
import File from './File';
import Dir from './Dir';

const Item: React.FC<{
  file: API.File;
}> = ({ file }) => {
  const Comp = file.type === 'dir' ? Dir : File;

  return <Comp file={file}></Comp>;
};

export default Item;
