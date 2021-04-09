declare namespace APP{

  export type MessageType = 'text' | 'image'

  export type ActionType = 'message' | 'offline' | 'online' | 'receipt'
    | 'waiting-users' | 'accept-user' | 'server-user-list'

  export type Action<T = any> = {
    req_id: number,
    action: ActionType,
    data: T,
    time: number,
    is_success?: boolean
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

  export type WaitingUser = {
    id: number,
    username: string
  }

  export type UserList = {
    list: APP.User[]
  }

  export type WaitingUserData = {
    list: WaitingUser[]
  }

  export type User = {
    id: number,
    username: string,
    avatar?: string,
    online: boolean,
    messages: Action<APP.Message>[],
    last_chat_time: number,
    unread: number,
    disabled: boolean
  }
}
