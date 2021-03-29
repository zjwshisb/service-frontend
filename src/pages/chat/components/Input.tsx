import React from "react";
import {Input, Form} from "antd";
import {useModel} from "umi";


const Index: React.FC = () => {
  const [form] = Form.useForm<{
    message: string
  }>()
  const webSocket = useModel('useWebsocketModel')

  const {current} = useModel('useCurrentModel')

  const sendMsg = React.useCallback((event: React.KeyboardEvent) => {
    if (event.shiftKey && event.code === 'Enter') {
      if (current) {
        const content = form.getFieldValue('message')
        const message: APP.Message = {
          created_at: (new Date()).getTime(),
          user_id: current.id,
          type: 'text',
          content,
          success: false,
          is_server: true,
        }
        webSocket.send(message)
        form.setFieldsValue({
          message: ''
        })
        event.preventDefault()
      }

    }
  }, [current, form, webSocket])
  return <div className='input'>
    <Form form={form} initialValues={{message: ''}}>
      <Form.Item name='message'>
        <Input.TextArea  bordered={false} autoSize={{maxRows: 6, minRows:6 }} onKeyDown={sendMsg} />
      </Form.Item>
    </Form>
  </div>
}
export default Index
