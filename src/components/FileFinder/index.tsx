import React from 'react';
import { Modal } from 'antd';
import Header from './components/Header';
import Container from './components/Container';
import { useModel } from '@umijs/max';

const FileFinder: React.FC = () => {
  const { open, onSelect, onCancel, setOpen, checked } = useModel('fileModel');

  return (
    <Modal
      styles={{
        footer: {
          padding: '20px',
        },
        content: {
          padding: 0,
        },
      }}
      onOk={() => {
        if (onSelect.current) {
          onSelect.current(checked);
        }
      }}
      onCancel={() => {
        setOpen(false);
        if (onCancel.current) {
          onCancel.current();
        }
      }}
      title={<Header />}
      open={open}
      width={'823px'}
    >
      <Container />
    </Modal>
  );
};
export default FileFinder;
