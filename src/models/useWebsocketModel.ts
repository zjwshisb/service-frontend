import React from "react";
import {getToken} from "@/utils/auth";
import {message} from "antd";
import {useModel} from "@@/plugin-model/useModel";
import lodash from 'lodash'

export default function useWebsocketModel() {

  const [websocket, setWebSocket] = React.useState<WebSocket | undefined>()
  const [online, setOnline] = React.useState(false)

  React.useEffect(() => {
    if (websocket) {
      websocket.onopen = (e) => {
        console.log(e)
        console.log('onopen')
        setOnline(true)
        console.log(websocket)
        message.success('链接服务器成功')
      }
      websocket.onerror = ev => {
        console.log('onerror')
        console.log(ev)
      }
      websocket.onmessage = ev => {
        console.log('onmessage')
        console.log(ev)
      }
      websocket.onclose = ev => {
        console.log(ev)
        console.log('close')
        setWebSocket(undefined)
      }
    }
  }, [websocket])

  const connect = React.useCallback(() => {
    setWebSocket(() => {
      const url = `${WS_URL  }?token=${  getToken()}`
      return new WebSocket(url)
    })
  }, [])

  const {users, setUsers} = useModel('useUsersModel')

  const send: (msg: APP.Message) => void = React.useCallback((msg: APP.Message) => {
    if (websocket) {
      websocket.send(JSON.stringify(msg))
      const index = users.findIndex((u: APP.User) => {
        return u.id === msg.to
      })
      if (index > -1) {
        const user = users[index]
        user.messages.push(msg)
        setUsers(lodash.cloneDeep(users))
      }
    }
  }, [setUsers, users, websocket])
  //
  // const reconnect = setWebsocket(() => {
  //   return new WebSocket(WS_URL)
  // })
  return {connect, send, online, setOnline}
}
