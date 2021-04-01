import React from "react";
import {getToken} from "@/utils/auth";

export default function useWebsocketModel() {

  const [websocket, setWebSocket] = React.useState<WebSocket | undefined>()
  const [onSend, setOnSend] = React.useState<(m: APP.Action) => void | undefined>()
  const [onMessage, setOnMessage] = React.useState<(msg: APP.Action) => void | undefined>()
  const [onOpen, setOpen] = React.useState<(e: Event) => void>()
  const [onError, setOnError] = React.useState<(e: Event) => void>()
  const [onClose, setOnClose] = React.useState<(e: CloseEvent) => void>()
  const [onOnline, setOnOnLine] = React.useState<(msg: APP.Action<APP.OnLine>) => void>()
  const [onOffline, setOnOffline] = React.useState<(msg: APP.Action<APP.OffLine>) => void>()
  const [onReceipt, setOnReceipt] = React.useState<(msg: APP.Action<APP.Receipt>) => void>()

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
              if (onMessage) onMessage((msg as APP.Action<APP.Message>))
              break
            }
            case "offline": {
              if (onOffline) onOffline((msg as APP.Action<APP.OnLine>))
              break
            }
            case "online": {
              if (onOnline) onOnline((msg as APP.Action<APP.OnLine>))
              break
            }
            case "receipt": {
              if (onReceipt) onReceipt((msg as APP.Action<APP.Receipt>))
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
  }, [onClose, onError, onMessage, onOffline, onOnline, onOpen, onReceipt, websocket])

  const connect = React.useCallback(() => {
    setWebSocket(() => {
      const url = `${WS_URL}?token=${getToken()}`
      return new WebSocket(url)
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
    setOnOnLine,
    setOnOffline,
    setOnReceipt
  }
}
