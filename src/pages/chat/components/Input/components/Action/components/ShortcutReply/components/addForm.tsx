import React from 'react';
import { Button, Input, Modal, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useModel } from '@@/plugin-model/useModel';

const Index = () => {
  const [visible, setVisible] = React.useState(false);

  const { addShortcutReply } = useModel('useShortcutReplyModel');

  const [form] = useForm<{
    text: string;
  }>();

  const close = React.useCallback(() => {
    setVisible(false);
    form.resetFields();
  }, [form]);

  const submit = React.useCallback(() => {
    form.validateFields().then((res) => {
      addShortcutReply(res.text).then(() => {
        close();
      });
    });
  }, [addShortcutReply, close, form]);

  return (
    <React.Fragment>
      <Button type={'primary'} size={'small'} onClick={() => setVisible(true)}>
        创建
      </Button>
      <Modal onCancel={close} title={'新增自动回复'} visible={visible} width={500} onOk={submit}>
        <Form
          form={form}
          initialValues={{
            text: '',
          }}
        >
          <Form.Item
            name={'text'}
            label={'回复内容'}
            rules={[{ required: true, max: 255, min: 1 }]}
          >
            <Input.TextArea showCount={true} maxLength={255} />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};
export default Index;
