import React from "react";
import './index.less'
import Bar from './components/Bar'
import Input from './components/Input'
import UserList from './components/UserList'
import MessageList from './components/MessageList'
import {useModel} from "umi"
import lodash from 'lodash'

const Index: React.FC = () => {

  const {connect, setOnMessage, setOnSend} = useModel('useWebsocketModel')
  const {setUsers} = useModel('useUsersModel')
  const {setCurrent} = useModel('useCurrentModel')
  const initialState = useModel('@@initialState', model => model.initialState)


  React.useEffect(() => {
    setOnSend(() => (msg: APP.Message) => {
      setCurrent(prevState => {
        if (prevState) {
          prevState.messages.push(msg)
          return lodash.cloneDeep(prevState)
        }
        return prevState
      })
    })
  }, [setCurrent, setOnSend])


  React.useEffect(() => {
    if (initialState?.currentUser) {
      setOnMessage(() => (message: APP.Message) => {
        setCurrent(c => {
          if (c && c.id === message.user_id) {
            c.messages.push(message as APP.Message)
            return lodash.cloneDeep(c)
          }
          return c
        })
        setUsers(prevState => {
          const user = prevState.find(v => v.id === message.user_id)
          if (user !== undefined) {
            user.messages.push(message)
            return lodash.cloneDeep(prevState)
          }
          return prevState
        })
      })
    }
  }, [initialState?.currentUser, setCurrent, setOnMessage, setUsers])


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
