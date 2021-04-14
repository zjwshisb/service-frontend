import React from "react";
import {Input, Form} from "antd";
import {useModel} from "umi";
import { createMsg } from "@/utils";
import lodash from 'lodash'


const Index: React.FC = () => {
  const [form] = Form.useForm<{
    message: string
  }>()
  const webSocket = useModel('useWebsocketModel')

  const {current} = useModel('useCurrentModel')
  const {users, setUsers} = useModel('useUsersModel')

  const sendMsg = React.useCallback((event: React.KeyboardEvent) => {
    if (event.shiftKey && event.code === 'Enter') {
      if (current ) {
        const currentUser = users.get(current)
        if (currentUser) {
          const content = form.getFieldValue('message')
          if (content !== '') {
            const action = createMsg(content, currentUser.id )
            webSocket.send(action)
            // 2秒后没有收到服务器回执修改消息发送结果为false
            setTimeout(() => {
              setUsers(prevState => {
                const u = prevState.get(current)
                if (u) {
                  const msg = u.messages.find(v => v.req_id === action.data.req_id)
                  if (msg && msg.is_success === undefined) {
                    msg.is_success = false
                    const newState = lodash.cloneDeep(prevState)
                    prevState.set(u.id, u)
                    return newState
                  }
                }
                return prevState
              })
            }, 2000)
            form.setFieldsValue({
              message: ''
            })
          }
          event.preventDefault()
        }
      }
    }
  }, [current, form, setUsers, users, webSocket])
  return <div className='input'>
    <Form form={form} initialValues={{message: ''}}>
      <Form.Item name='message'>
        <Input.TextArea disabled={current === 0 || users.get(current)?.disabled} showCount={true} maxLength={512} placeholder={'enter+shirt 发送'} bordered={false} autoSize={{maxRows: 6, minRows:6 }} onKeyDown={sendMsg} />
      </Form.Item>
    </Form>
  </div>
}
export default Index
