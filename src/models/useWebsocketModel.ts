import React from "react";
import {getToken} from "@/utils/auth";

export default function useWebsocketModel() {

  const [websocket, setWebSocket] = React.useState<WebSocket | undefined>()
  const [onSend, setOnSend] = React.useState<(m: APP.Message) => void | undefined>()
  const [onMessage, setOnMessage] = React.useState<(msg: APP.Message) => void | undefined>()
  const [onOpen, setOpen] = React.useState<(e: Event) => void>()
  const [onError, setOnError] = React.useState<(e: Event) => void>()
  const [onClose, setOnClose] = React.useState<(e: CloseEvent) => void>()
  const [onOnline, setOnOnLine] = React.useState<(msg: APP.OnLine) => void>()
  const [onOffline, setOnOffline] = React.useState<(msg: APP.OnLine) => void>()

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
          const msg = JSON.parse(e.data)
          switch ((msg as APP.Action).action) {
            case "message": {
              if (onMessage) onMessage((msg.data as APP.Message))
              break
            }
            case "offline": {
              if (onOffline) onOffline((msg.data as APP.OffLine))
              break
            }
            case "online": {
              if (onOnline) onOnline((msg.data as APP.OnLine))
              break
            }
            default: {
              break
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
  }, [onClose, onError, onMessage, onOffline, onOnline, onOpen, websocket])

  const connect = React.useCallback(() => {
    setWebSocket(() => {
      const url = `${WS_URL}?token=${getToken()}`
      return new WebSocket(url)
    })
  }, [])


  const send: (msg: APP.Message) => void = React.useCallback((msg: APP.Message) => {
    if (websocket) {
      websocket.send(JSON.stringify(msg))
      if (onSend) {
        onSend(msg)
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
    setOnOnLine,
    setOnOffline
  }
}
