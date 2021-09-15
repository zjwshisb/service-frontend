import React, { useState } from 'react';
import { AuditOutlined } from '@ant-design/icons/lib';
import { useModel } from '@@/plugin-model/useModel';
import styles from '../index.less';
import DraggableView from '@/components/DraggableView';
import { Descriptions, Empty, Tooltip } from 'antd';
import { getUserInfo } from '@/services';

const Index = () => {
  const { current } = useModel('useCurrentModel');
  const [info, setInfo] = useState<Record<string, any>>({});

  React.useEffect(() => {
    if (current?.id) {
      getUserInfo(current.id).then((res) => {
        setInfo(res.data);
      });
    } else {
      setInfo({});
    }
  }, [current]);

  return (
    <DraggableView
      title={'用户信息'}
      defaultVisible={false}
      top="300px"
      trigger={(visible) => (
        <Tooltip placement={'left'} title={'用户信息'}>
          <div className={styles.item}>
            <AuditOutlined className={styles.icon} data-active={visible} />
          </div>
        </Tooltip>
      )}
    >
      <div>
        {Object.keys(info).length > 0 && (
          <Descriptions column={1} bordered size={'small'}>
            <Descriptions.Item label={'用户名称'}>{info.username}</Descriptions.Item>
          </Descriptions>
        )}
        {Object.keys(info).length <= 0 && <Empty />}
      </div>
    </DraggableView>
  );
};
export default Index;
