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

  type BaseAction<T = any, A = ActionType> = {
    action: A;
    data: T;
    time: number;
  };

  type SendMessageAction = BaseAction<API.Message, 'send-message'>;

  type Action =
    | BaseAction<API.Admin[], 'admins'>
    | BaseAction<{ user_id: number }, 'user-offline'>
    | BaseAction<{ user_id: number; platform: API.Platform }, 'user-online'>
    | BaseAction<string, 'error-message'>
    | BaseAction<undefined, 'more-than-one'>
    | BaseAction<undefined, 'other-login'>
    | BaseAction<number[], 'read'>
    | BaseAction<{ req_id: string; msg_id: number }, 'receipt'>
    | BaseAction<API.Message, 'receive-message'>
    | BaseAction<API.WaitingUser[], 'waiting-users'>
    | BaseAction<API.Transfer[], 'user-transfer'>;

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

  type Admin = {
    id: number;
    username: string;
    avatar: string;
    online: boolean;
    accepted_count: number;
  };

  type AdminChatSetting = {
    background: API.File | null;
    is_auto_accept: boolean;
    welcome_content: string;
    offline_content: string;
    name: string;
    avatar: API.File | null;
  };

  type FileType = 'image' | 'video' | 'audio' | 'dir' | 'pdf';

  type SelectFileType = Omit<FileType, 'dir'>;

  type File = {
    id: number;
    name: string;
    url: string;
    thumb_url: string;
    type: API.FileType;
    path: string;
  };
}
