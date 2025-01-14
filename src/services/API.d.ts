declare namespace API {
  type Response<T = any> = {
    success: true;
    data: T;
    message?: string;
  };

  type Pagination<T = any> = {
    success: true;
    data: T[];
    total: number;

    message?: string;
  };

  type Option = {
    label: string;
    value: number | string;
  };

  type OptionType =
    | 'auto-messages'
    | 'auto-rule-scenes'
    | 'file-types'
    | 'message-types'
    | 'auto-rule-match-types'
    | 'auto-rule-reply-types'
    | 'session-status';

  type ActionType =
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
    | 'error-message'
    | 'read';

  type Action<T = any, A = ActionType> = {
    action: A;
    data: T;
    time: number;
  };

  type Receipt = {
    user_id: number;
    req_id: string;
    msg_id: number;
  };

  type MessageType = 'text' | 'navigator' | 'image' | 'audio' | 'video' | 'pdf';

  type Platform = 'h5' | 'app' | 'weapp' | 'web' | '';

  type NavigatorContent = {
    title: string;
    content: string;
    image: string;
  };

  type SourceUser = 0;

  type SourceService = 1;

  type SourceSystem = 2;

  type Source = SourceUser | SourceService | SourceSystem;

  type Message = {
    type: MessageType;
    user_id: number;
    admin_id?: number;
    id?: number;
    content: string;
    source: Source;
    is_success?: boolean;
    req_id: string;
    received_at: string;
    avatar: string;
    is_read: boolean;
  };

  type UserInfoItem = {
    label: string;
    name: string;
    description: string;
  };

  type OffLine = {
    user_id: number;
  };

  type OnLine = {
    user_id: number;
    platform: Platform;
  };

  type WaitingUser = {
    session_id: number;
    id: number;
    username: string;
    avatar: string;
    last_time: string;
    messages: {
      type: MessageType;
      time: string;
      content: string;
      id: number;
    }[];
    message_count: number;
  };

  type Transfer = {
    id: number;
    username: string;
    user_id: number;
    from_admin_name: string;
    created_at: string;
    accepted_at: string;
    canceled_at: string;
    remark: string;
    from_session_id: number;
    to_session_id: number;
  };

  type CurrentChatUser = Pick<User, 'id' | 'avatar' | 'disabled' | 'username'> & {
    messages: API.Message[];
  };

  type User = {
    id: number;
    username: string;
    avatar?: string;
    online: boolean;
    last_message?: API.Message;
    last_chat_time: string;
    unread: number;
    disabled: boolean;
    platform: Platform;
  };

  type Setting = {
    id: number;
    name: string;
    value: string | API.File;
    options: Option[];
    title: string;
    type: 'select' | 'text' | 'image';
    created_at: string;
    updated_at: string;
  };

  type CurrentUser = {
    username: string;
    id: number;
    avatar: string;
  };

  type AutoMessage = {
    id: number;
    name: string;
    type: MessageType;
    content: string;
    file?: API.File;
    navigator?: {
      title: string;
      url: string;
      image: API.File;
    };
    created_at: string;
    updated_at: string;
  };

  type AutoRuleMatchType = 'all' | 'part';

  type ReplyType = 'message' | 'transfer' | 'event';

  type SystemRule = {
    id: number;
    name: string;
    message_id?: number;
  };

  type AutoRule = {
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
    is_open: boolean;
    event_label: string;
    scenes_label: string;
    scenes: string[];
  };
  declare namespace Dashboard {
    type SimpleUser = {
      id: number;
      username: string;
    };
    type OnlineInfo = {
      user: number;
      waiting: number;
      admin: number;
    };
  }

  type ChatSessionStatus = 'cancel' | 'accept' | 'wait' | 'close';

  type ChatSession = {
    id: number;
    admin_name: string;
    username: string;
    queried_at: string;
    accepted_at: string;
    broken_at: string;
    type_label: string;
    status: ChatSessionStatus;
    canceled_at: string;
  };

  type ChatFile = {
    admin_name: string;
    user_name: string;
    created_at: string;
  } & API.File;
}
