import React from 'react';
import { Modal, Space, Tooltip } from 'antd';
import Header from './components/Header';
import Container from './components/Container';
import { useModel } from '@umijs/max';
import { Access } from '@@/exports';

const FileFinder: React.FC = () => {
  const { open, onSelect, onCancel, checked } = useModel('fileModel');

  return (
    <Modal
      getContainer={'body'}
      zIndex={999}
      styles={{
        footer: {
          padding: '20px',
        },
        content: {
          padding: 0,
        },
      }}
      onOk={() => onSelect.current?.(checked)}
      onCancel={onCancel.current}
      title={<Header />}
      open={open}
      okButtonProps={{
        disabled: checked.length === 0,
      }}
      footer={(origin) => {
        return (
          <div>
            <span className={'mr-1'}>
              已选(
              <Access accessible={checked.length > 0} fallback={0}>
                <Tooltip
                  title={checked.map((v) => {
                    return <div key={v.id}>{v.name}</div>;
                  })}
                >
                  <span className={'text-blue-600 cursor-pointer'}>{checked.length}</span>
                </Tooltip>
              </Access>
              )
            </span>
            <Space>{origin}</Space>
          </div>
        );
      }}
      width={'825px'}
    >
      <Container />
    </Modal>
  );
};
export default FileFinder;
