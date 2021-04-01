declare namespace APP{

  export type MessageType = 'text' | 'image'

  export type ActionType = 'message' | 'offline' | 'online' | 'receipt'

  export type Action<T = any> = {
    req_id: number,
    action: ActionType,
    data: T,
    time: number,
    is_success: boolean
  }

  export type Receipt = {
    user_id: number
  }

  export type Message = {
    type: MessageType
    user_id: number
    service_id?: number
    id?: number
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
    is_online: boolean,
    messages: Action<APP.Message>[],
    last_send_time: number,
    unread: number
  }
}
