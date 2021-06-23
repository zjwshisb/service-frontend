declare namespace API {
  export type Response<T = any> = {
    success: true;
    data: T;
    message?: string;
  };

  export type Pagination<T = any> = {
    success: true;
    data: {
      list: T[];
      total: number;
      page: number;
    };
    message?: string;
  };

  export type ActionType =
    | 'send-message'
    | 'user-offline'
    | 'user-online'
    | 'receipt'
    | 'waiting-users'
    | 'service-users'
    | 'receive-message'
    | 'other-login'
    | 'more-than-one';

  export type Action<T = any> = {
    action: ActionType;
    data: T;
    time: number;
  };

  export type Receipt = {
    user_id: number;
    req_id: number;
  };

  export type MessageType = 'text' | 'image' | 'navigator';

  export type Message = {
    type: MessageType;
    user_id: number;
    service_id?: number;
    id?: number;
    content: string;
    is_server: boolean;
    is_success?: boolean;
    req_id: number;
    received_at: number;
    avatar: string;
  };

  export type OffLine = {
    user_id: number;
  };

  export type OnLine = {
    user_id: number;
  };

  export type WaitingUser = {
    id: number;
    username: string;
    avatar: string;
    last_message: string;
    last_time: number;
    message_count: number;
  };

  export type User = {
    id: number;
    username: string;
    avatar?: string;
    online: boolean;
    messages: APP.Message[];
    last_chat_time: number;
    unread: number;
    disabled: boolean;
  };

  export type ServiceUser = {
    id: number;
    username: string;
    avatar: string;
    online: boolean;
    today_accept_count: number;
  };

  export type Setting = {
    id: string;
    name: string;
    value: string;
    created_at: string;
    updated_at: string;
  };

  export type CurrentUser = {
    username: string;
    id: number;
    avatar: string;
  };

  export type ShortcutReply = {
    content: string;
    id: number;
  };

  export type AutoMessage = {
    id: number;
    name: string;
    type: MessageType;
    content: any;
    created_at: string;
    updated_at: string;
  };
}
