import React from "react";
import {Input, Form} from "antd";
import {useModel} from "umi";


const Index: React.FC = () => {
  const [form] = Form.useForm<{
    message: string
  }>()
  const webSocket = useModel('useWebsocketModel')

  const sendMsg = React.useCallback((event: React.KeyboardEvent) => {
    if (event.shiftKey && event.code === 'Enter') {
      const content = form.getFieldValue('message')
      const message: APP.Text = {
        id: 1,
        from: 1,
        to: 1,
        type: 'text',
        time: (new Date()).getTime(),
        content,
        success: false
      }
      webSocket.send(message)
      form.setFieldsValue({
        message: ''
      })
      event.preventDefault()
    }
  }, [form, webSocket])
  return <div className='input'>
    <Form form={form} initialValues={{message: ''}}>
      <Form.Item name='message'>
        <Input.TextArea  bordered={false} autoSize={{maxRows: 6, minRows:6 }} onKeyDown={sendMsg} />
      </Form.Item>
    </Form>
  </div>
}
export default Index
