import React from "react";
import {getToken} from "@/utils/auth";
import lodash from 'lodash'

export type ActionHandle<T = any> = (action: APP.Action<T>) => void
export type EventHandle<T extends Event = Event> = (e: T) => void


export default function useWebsocketModel() {

  const [websocket, setWebSocket] = React.useState<WebSocket | undefined>()
  const [onSend, setOnSend] = React.useState<ActionHandle | undefined>()
  const [onMessage, updateOnMessage] = React.useState<Map<APP.ActionType, ActionHandle>>(new Map())
  const [onOpen, setOnOpen] = React.useState<EventHandle>()
  const [onError, setOnError] = React.useState<EventHandle>()
  const [onClose, setOnClose] = React.useState<EventHandle<CloseEvent>>()

  React.useEffect(() => {
    if (websocket) {
      websocket.onopen = (e) => {
        if (onOpen) {
          onOpen(e)
        }
      }
      // 连接服务器失败
      websocket.onerror = (e: Event) => {
        console.log('error')
        console.log(e)
        if (onError) {
          onError(e)
        }
      }
      websocket.onmessage = (e: MessageEvent<string>) => {
        try {
          if (e.data !== '') {
            const action: APP.Action = JSON.parse(e.data)
            const handle = onMessage.get(action.action)
            if (handle) {
              handle(action)
            }
          }
        }catch (err) {
          console.log(err)
        }
      }
      // 服务器断开连接会触发该事件/连接服务器失败触发error事件后也会触发该事件
      websocket.onclose = e => {
        setWebSocket(undefined)
        if (onClose) {
          onClose(e)
        }
      }
    }
  }, [onClose, onError, onMessage,onOpen, websocket])

  const connect = React.useCallback(() => {
    setWebSocket(() => {
      const url = `${WS_URL}?token=${getToken()}`
      return new WebSocket(url)
    })
  }, [])

  const setOnMessage = React.useCallback(<T>(callback: ActionHandle<T>, type: APP.ActionType): void => {
    updateOnMessage(prevState => {
      const newState = lodash.cloneDeep(prevState)
      newState.set(type, callback)
      return newState
    })
  }, [])


  const send: <T>(msg: APP.Action<T>) => void = React.useCallback(<T>(action: APP.Action<T>) => {
    if (websocket) {
      try {
        websocket.send(JSON.stringify(action))
        if (onSend) {
          onSend(action)
        }
      }catch (e) {
        console.log(e)
      }
    }
  }, [onSend, websocket])
  return {
    connect,
    send,
    setOnSend,
    setOnMessage,
    setOnOpen,
    setOnError,
    setOnClose,
  }
}
