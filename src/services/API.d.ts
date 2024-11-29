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
    | 'auto-rule-reply-types';

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
    | 'error-message';

  type Action<T = any, A = ActionType> = {
    action: A;
    data: T;
    time: number;
  };

  type Receipt = {
    user_id: number;
    req_id: number;
  };

  type MessageType = 'text' | 'file' | 'navigator';

  type NavigatorContent = {
    title: string;
    content: string;
    url: string;
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
    req_id: number;
    received_at: number;
    avatar: string;
  };

  type OffLine = {
    user_id: number;
  };

  type OnLine = {
    user_id: number;
  };

  type WaitingUser = {
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

  type Transfer = {
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

  type User = {
    id: number;
    username: string;
    avatar?: string;
    online: boolean;
    messages: API.Message[];
    last_chat_time: number;
    unread: number;
    disabled: boolean;
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
    type QueryInfo = {
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
    type OnlineInfo = {
      user_count: number;
      waiting_user_count: number;
      admin_count: number;
    };
  }

  type ChatSessionStatus = 'cancel' | 'accept' | 'wait';

  type ChatSession = {
    id: number;
    admin_name: string;
    user_name: string;
    queried_at: string;
    accepted_at: string;
    broke_at: string;
    type_label: string;
    status: ChatSessionStatus;
    canceled_at: string;
  };

  type Line = {
    value: number;
    label: string;
    category: string;
  };
}
