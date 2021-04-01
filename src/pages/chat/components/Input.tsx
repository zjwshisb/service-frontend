import React from "react";
import {Input, Form} from "antd";
import {useModel} from "umi";
import { createMsg } from "@/utils";


const Index: React.FC = () => {
  const [form] = Form.useForm<{
    message: string
  }>()
  const webSocket = useModel('useWebsocketModel')

  const {current} = useModel('useCurrentModel')
  const {users} = useModel('useUsersModel')

  const sendMsg = React.useCallback((event: React.KeyboardEvent) => {
    if (event.shiftKey && event.code === 'Enter') {
      if (current ) {
        const currentUser = users.get(current)
        if (currentUser) {
          const content = form.getFieldValue('message')
          const action = createMsg(content, currentUser.id )
          webSocket.send(action)
          form.setFieldsValue({
            message: ''
          })
          event.preventDefault()
        }
      }
    }
  }, [current, form, users, webSocket])
  return <div className='input'>
    <Form form={form} initialValues={{message: ''}}>
      <Form.Item name='message'>
        <Input.TextArea disabled={current === 0} showCount={true} maxLength={512} placeholder={'enter+shirt 发送'} bordered={false} autoSize={{maxRows: 6, minRows:6 }} onKeyDown={sendMsg} />
      </Form.Item>
    </Form>
  </div>
}
export default Index
