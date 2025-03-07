declare namespace FORM {
  type LoginForm = {
    username: string;
    password: string;
  };

  type Paginate<T extends Record<string, any>> = {
    current: number;
    pageSize: number;
  } & T;

  type AutoMessageForm = {
    id?: number;
    name: string;
    type: API.MessageType;
    file?: API.File;
    navigator?: {
      url: string;
      title: string;
      image: API.File;
    };
    content: string;
  };
  type Pagination<T = Record<any, any>> = {
    pageSize?: number;
    current?: number;
  } & T;

  type AutoRuleForm = {
    name: string;
    match: string;
    match_type: API.AutoRuleMatchType;
    reply_type: API.ReplyType;
    sort: number;
    is_open: boolean;
    message_id?: number;
    key: string;
    scenes: string[];
  };

  type AdminForm = {
    username: string;
    password: string;
  };
}
