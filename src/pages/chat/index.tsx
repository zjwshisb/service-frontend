import React from "react";
import './index.less'
import Bar from './components/Bar'
import Input from './components/Input'
import UserList from './components/UserList'
import MessageList from './components/MessageList'
import WaitingUser from './components/WaitingUser/index'
import {useModel} from "umi"
import lodash from 'lodash'
import { message, Modal } from "antd";
import { removeToken } from "@/utils/auth";


const Index: React.FC = () => {

  const {connect, setOnMessage, setOnSend, setOnClose, setOnError, setOnOpen} = useModel('useWebsocketModel')
  const {setUsers} = useModel('useUsersModel')
  const {setWaitingUsers} = useModel('useWaitingUserModel')
  const {current} = useModel('useCurrentModel')

  React.useEffect(() => {
    setOnOpen(() =>  () => {
      message.success('连接聊天服务器成功').then()
    })
    setOnClose(() => () => {
      Modal.error({
        title: '提示',
        content: '与服务器连接已断开',
        okText: '请重新登录',
        onOk: async () => {
          removeToken()
          window.location.reload()
        }
      })
    })
  }, [setOnOpen, setOnError, setOnClose, connect])


  React.useEffect(() => {
    setOnSend(() => {
      return (action: APP.Action<APP.Message>) => {
        setUsers(prevState => {
          const newState = lodash.cloneDeep(prevState)
          const user = newState.get(action.data.user_id)
          if (user) {
            user.messages.push(action.data)
            return newState
          }
          return prevState
        })
      }
    })
  }, [setOnSend, setUsers])

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.UserList>) => {
      setUsers(() => {
        const map = new Map<number, APP.User>()
        action.data.list.forEach(v => {
          map.set(v.id, v)
        })
        return map
      })
    }, 'server-user-list')

  }, [setOnMessage, setUsers])

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.Receipt>) => {
      setUsers(prevState => {
        const user = prevState.get(action.data.user_id)
        if (user !== undefined) {
          const index = user.messages.findIndex(v => v.req_id === action.data.req_id)
          if (index > -1) {
            user.messages[index].is_success = true
          }
          return lodash.cloneDeep(prevState)
        }
        return prevState
      })
    }, 'receipt')
  }, [setOnMessage, setUsers])

  React.useEffect(() => {
    setOnMessage((action: APP.Action<{list: APP.WaitingUser[]}>) => {
      if (action.action === "waiting-users") {
        setWaitingUsers(action.data.list)
      }
    }, 'waiting-users')
  }, [setOnMessage, setWaitingUsers])


  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.Message>) => {
      const msg = action.data
      setUsers(prevState => {
        const newState = lodash.cloneDeep(prevState)
        const user = newState.get(msg.user_id)
        if (user) {
          user.messages.push(action.data)
          if (current !== user.id) {
            user.unread += 1
          }
          return newState
        }
        return prevState
      })
    }, 'message')
  }, [current, setOnMessage, setUsers])

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.OnLine>) => {
      setUsers(prevState => {
        if ( prevState.get(action.data.user_id)) {
          const newState = lodash.cloneDeep(prevState)
          const user = newState.get(action.data.user_id)
          if (user) {
            user.online = true
            message.success(`${user.username}上线啦`).then()
          }
          return newState
        }
        return prevState
      })
    }, 'user-online')
  }, [setOnMessage, setUsers])

  React.useEffect(() => {
    setOnMessage((action: APP.Action<APP.OffLine>) => {
      setUsers(prevState => {
        if ( prevState.get(action.data.user_id)) {
          const newState = lodash.cloneDeep(prevState)
          const user = newState.get(action.data.user_id)
          if (user) {
            user.online = false
            message.info(`${user.username}下线啦`).then()
          }
          return newState
        }
        return prevState
      })
    }, 'user-offline')
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
