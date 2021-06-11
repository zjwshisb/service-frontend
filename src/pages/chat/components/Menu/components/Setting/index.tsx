import React from 'react';
import { SettingOutlined } from '@ant-design/icons/lib';
import styles from '../index.less';
import { Modal, Form } from 'antd';

const Index = () => {
  const [visible, setVisible] = React.useState(false);

  return React.useMemo(() => {
    return (
      <div className={styles.item} onClick={() => setVisible(true)} data-active={visible}>
        <SettingOutlined className={styles.icon} data-active={visible} />
        <Modal
          visible={visible}
          title={'基本设置'}
          onCancel={(e) => {
            e.stopPropagation();
            setVisible(false);
          }}
        >
          <Form />
        </Modal>
      </div>
    );
  }, [visible]);
};
export default Index;
