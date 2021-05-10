import React from 'react';
import { UnorderedListOutlined } from '@ant-design/icons/lib';
import styles from '../index.less';
import { Modal, Table } from 'antd';

const Index = () => {
  const [visible, setVisible] = React.useState(false);

  return React.useMemo(() => {
    return (
      <div className={styles.item} onClick={() => setVisible(true)} data-active={visible}>
        <UnorderedListOutlined />
        <Modal
          visible={visible}
          title={'快捷回复'}
          bodyStyle={{ padding: 0 }}
          onCancel={(e) => {
            setVisible(false);
            e.stopPropagation();
          }}
        >
          <Table size={'small'} />
        </Modal>
      </div>
    );
  }, [visible]);
};
export default Index;
