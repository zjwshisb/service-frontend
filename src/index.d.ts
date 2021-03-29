declare namespace APP{

  export type MessageType = 'text' | 'image'

  export type ActionType = 'message' | 'offline' | 'online'

  export type Action<T = any> = {
    req_id: number,
    action: ActionType,
    data: T,
    time: string
  }

  export type Message = {
    type: MessageType
    user_id: number
    service_id?: number
    id?: number
    success: boolean
    content: string
    is_server: boolean
  }

  export type OffLine = {
    user_id: number
  }

  export type OnLine = {
    user_id: number
  }

  export type User = {
    id: number,
    name: string,
    avatar?: string,
    isOnline: boolean,
    messages: Message[],
    lastTime: number
  }
}
