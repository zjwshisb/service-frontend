import React from "react";
import './index.less'
import Bar from './components/Bar'
import Input from './components/Input'
import UserList from './components/UserList'
import MessageList from './components/MessageList'
import {useModel} from "umi"
import lodash from 'lodash'

const Index: React.FC = () => {

  const {connect, setOnMessage, setOnSend, setOnReceipt} = useModel('useWebsocketModel')
  const {setUsers} = useModel('useUsersModel')


  React.useEffect(() => {
    setOnSend(() => {
      return (action: APP.Action<APP.Message>) => {
        setUsers(prevState => {
          const newState = lodash.cloneDeep(prevState)
          const user = newState.get(action.data.user_id)
          if (user) {
            user.messages.push(action)
            return newState
          }
          return prevState
        })
      }
    })
  }, [setOnSend, setUsers])

  React.useEffect(() => {
    setOnReceipt(() => (action: APP.Action<APP.Receipt>) => {
      setUsers(prevState => {
        const user = prevState.get(action.data.user_id)
        if (user) {
          const index = user.messages.findIndex(v => v.req_id === action.req_id)
          if (index > -1) {
            user.messages[index].is_success = true
          }
          return lodash.cloneDeep(prevState)
        }
        return prevState
      })
    })
  }, [setOnReceipt, setUsers])

  React.useEffect(() => {
    setOnMessage(() => (action: APP.Action<APP.Message>) => {
      const message = action.data
      setUsers(prevState => {
        const newState = lodash.cloneDeep(prevState)
        const user = newState.get(message.user_id)
        if (user) {
          user.messages.push(action)
          user.unread += 1
          return newState
        }
        return prevState
      })
    })
  }, [setOnMessage, setUsers])


  React.useEffect(() => {
    connect()
  }, [connect])

  return <div className='chat-container'>
    <div className='chat'>
      <div className='title'>
      </div>
      <div className='body'>
        <UserList/>
        <div className='message'>
          <MessageList/>
          <Bar/>
          <Input/>
        </div>
      </div>
    </div>
  </div>
}
export default Index
