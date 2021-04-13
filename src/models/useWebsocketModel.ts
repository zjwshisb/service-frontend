import React from "react";
import {getToken} from "@/utils/auth";
import lodash from 'lodash'

export type ActionHandle<T = any> = (action: APP.Action<T>) => void


export default function useWebsocketModel() {

  const [websocket, setWebSocket] = React.useState<WebSocket | undefined>()
  const [onSend, setOnSend] = React.useState<ActionHandle | undefined>()
  const [onMessage, updateOnMessage] = React.useState<Map<APP.ActionType, ActionHandle>>(new Map())
  const [onOpen, setOpen] = React.useState<(e: Event) => void>()
  const [onError, setOnError] = React.useState<(e: Event) => void>()
  const [onClose, setOnClose] = React.useState<(e: CloseEvent) => void>()

  React.useEffect(() => {
    if (websocket) {
      websocket.onopen = (e) => {
        if (onOpen) {
          onOpen(e)
        }
      }
      websocket.onerror = (e: Event) => {
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
      websocket.onclose = e => {
        if (onClose) {
          onClose(e)
        }
        setWebSocket(undefined)
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
      websocket.send(JSON.stringify(action))
      if (onSend) {
        onSend(action)
      }
    }
  }, [onSend, websocket])
  return {
    connect,
    send,
    setOnSend,
    setOnMessage,
    setOpen,
    setOnError,
    setOnClose,
  }
}
