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
    | 'admins'
    | 'receive-message'
    | 'other-login'
    | 'more-than-one'
    | 'user-transfer'
    | 'error-message';

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
    session_id: number;
    user_id: number;
    username: string;
    avatar: string;
    last_time: number;
    messages: {
      type: MessageType;
      time: number;
      content: string;
    }[];
    message_count: number;
  };

  export type Transfer = {
    id: number;
    username: string;
    user_id: number;
    from_admin_name: string;
    created_at: string;
    accepted_at: string;
    canceled_at: string;
    remark: string;
    session_id: number;
  };

  export type User = {
    id: number;
    username: string;
    avatar?: string;
    online: boolean;
    messages: API.Message[];
    last_chat_time: number;
    unread: number;
    disabled: boolean;
  };

  export type Admin = {
    id: number;
    username: string;
    avatar: string;
    online: boolean;
    accepted_count: number;
  };

  export type AdminChatSetting = {
    background: string;
    is_auto_accept: boolean;
    welcome_content: string;
    offline_content: string;
    name: strings;
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
    rules_count: number;
  };

  export type AutoRuleMatchType = 'all' | 'part';

  export type ReplyType = 'message' | 'transfer' | 'event';

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
    key: string;
    event_label: string;
    scenes_label: string;
    scenes: string[];
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

  export type ChatSessionStatus = 'cancel' | 'accept' | 'wait';

  export type ChatSession = {
    id: number;
    admin_name: string;
    user_name: string;
    queried_at: number;
    accepted_at: number;
    broke_at: number;
    type_label: string;
    status: ChatSessionStatus;
    canceled_at: number;
  };

  export type Line = {
    value: number;
    label: string;
    category: string;
  };
}
