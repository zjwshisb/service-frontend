declare namespace API {
  export type Response<T = any> = {
    success: true;
    data: T;
    message?: string;
  };

  export type Pagination<T = any> = {
    success: true;
    data: T[];
    total: number;

    message?: string;
  };

  export type Option = {
    label: string;
    value: number | string;
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

  export type NavigatorContent = {
    title: string;
    content: string;
    url: string;
  };

  export type SourceUser = 0;

  export type SourceService = 1;

  export type SourceSystem = 2;

  export type Message = {
    type: MessageType;
    user_id: number;
    admin_id?: number;
    id?: number;
    content: string;
    source: SourceUser | SourceService | SourceSystem;
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
    last_type: MessageType;
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
    name: string;
    value: string;
    options: Record<string, string>;
    title: string;
  };

  export type CurrentUser = {
    username: string;
    id: number;
    avatar: string;
  };

  export type AutoMessage = {
    id: number;
    name: string;
    type: MessageType;
    content: string;
    created_at: string;
    updated_at: string;
  };

  export type AutoRuleMatchType = 'all' | 'part';

  export type ReplyType = 'message' | 'transfer';

  export type AutoRule = {
    id: number;
    name: string;
    match: string;
    match_type: AutoRuleMatchType;
    reply_type: ReplyType;
    sort: number;
    count: number;
    created_at: string;
    updated_at: string;
    message?: AutoMessage;
    message_id: number;
    is_open: boolean;
  };
  declare namespace Dashboard {
    export type QueryInfo = {
      user_count: number;
      message_count: number;
      max_time: number;
      avg_time: number;
      chart: {
        label: string;
        count: number;
        category: string;
      }[];
    };
    export type OnlineInfo = {
      user_count: number;
      waiting_user_count: number;
      admin_count: number;
    };
  }

  export type ChatSession = {
    id: number;
    admin_name: string;
    user_name: string;
    queried_at: number;
    accepted_at: number;
    broke_at: number;
  };
}
