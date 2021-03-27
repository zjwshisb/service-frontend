declare namespace APP{

  export type MessageType = 'text' | 'image'

  export interface Message {
    type: MessageType
    from: number
    to: number
    id: number
    time: number
    success: boolean
  }

  export interface Text extends Message {
    type: 'text',
    content: string
  }

  export interface Image extends Message{
    type: 'image',
    text: string
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
