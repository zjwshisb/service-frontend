import React from "react";
import './index.less'
import Bar from './components/Bar'
import Input from './components/Input'
import UserList from './components/UserList'
import MessageList from './components/MessageList'
import WaitingUser from './components/WaitingUser/index'
import {useModel} from "umi"
import lodash from 'lodash'

const Index: React.FC = () => {

  const {connect, setOnMessage, setOnSend} = useModel('useWebsocketModel')
  const {setUsers} = useModel('useUsersModel')
  const {setWaitingUsers} = useModel('useWaitingUserModel')

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
    setOnMessage((action: APP.Action<APP.UserList>) => {
      if (action.action === "server-user-list") {
        setUsers(() => {
          const map = new Map<number, APP.User>()
          action.data.list.forEach(v => {
            map.set(v.id, v)
          })
          return map
        })
      }
    })

  }, [setOnMessage, setUsers])

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.Receipt>) => {
      if (action.action === "receipt") {
        setUsers(prevState => {
          const user = prevState.get(action.data.user_id)
          if (user !== undefined) {
            const index = user.messages.findIndex(v => v.req_id === action.req_id)
            if (index > -1) {
              user.messages[index].is_success = true
            }
            return lodash.cloneDeep(prevState)
          }
          return prevState
        })
      }
    })
    setOnMessage((action: APP.Action<{list: APP.WaitingUser[]}>) => {
      if (action.action === "waiting-users") {
        setWaitingUsers(action.data.list)
      }
    })
  }, [setOnMessage, setUsers, setWaitingUsers])



  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.Message>) => {
      if (action.action === "message") {
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
      }
    })
  }, [setOnMessage, setUsers])


  React.useEffect(() => {
    connect()
  }, [connect])

  return <div className='chat-container'>
    <div className='chat'>
      <div className='title'>
        <WaitingUser />
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
