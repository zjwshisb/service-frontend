import React from 'react';
import { SettingOutlined } from '@ant-design/icons/lib';
import styles from '../index.less';
import { useModel } from '@@/plugin-model/useModel';
import ProForm, {
  ModalForm,
  ProFormSwitch,
  ProFormTextArea,
  ProFormText,
} from '@ant-design/pro-form';
import { updateChatSetting } from '@/services';
import ImageSelect from '@/components/Upload/index';
import { message, Tooltip } from 'antd';

const Index = () => {
  const [visible, setVisible] = React.useState(false);
  const { setting, refresh } = useModel('useSettingModel');

  return React.useMemo(() => {
    return (
      <>
        <Tooltip title={'客服设置'} placement={'left'}>
          <div className={styles.item} onClick={() => setVisible(true)} data-active={visible}>
            <SettingOutlined className={styles.icon} data-active={visible} />
          </div>
        </Tooltip>
        <ModalForm
          visible={visible}
          title={'基本设置'}
          onVisibleChange={(v) => setVisible(v)}
          onFinish={async (data: API.AdminChatSetting) => {
            await updateChatSetting(data);
            message.success('设置成功');
            refresh();
            return true;
          }}
          layout="horizontal"
          initialValues={setting}
        >
          <ProFormText name={'name'} label={'客服名称'} rules={[{ max: 8, required: true }]} />
          <ProFormSwitch
            name={'is_auto_accept'}
            label={'是否自动接入'}
            tooltip={'开启后当用户咨询时会自动接入'}
          />
          <ProFormTextArea
            fieldProps={{ autoSize: true }}
            rules={[{ max: 512 }]}
            name={'welcome_content'}
            label={'欢迎语'}
            tooltip={'接入用户后自动发送的欢迎语'}
          />
          <ProFormTextArea
            fieldProps={{ autoSize: true }}
            rules={[{ max: 512 }]}
            name={'offline_content'}
            label={'离线时的回复'}
            tooltip={'不在线时用户发送消息的自动回复'}
          />
          <ProForm.Item name={'background'} label={'背景图片'} tooltip={'此界面的背景图片'}>
            <ImageSelect action={`${BASE_URL}/me/settings/image`} corp={false} width={'200px'} />
          </ProForm.Item>
        </ModalForm>
      </>
    );
  }, [refresh, setting, visible]);
};
export default Index;
