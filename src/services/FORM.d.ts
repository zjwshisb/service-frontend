declare namespace FORM {
  export type AutoMessageForm = {
    id?: number;
    name: string;
    type: API.MessageType;
    content: string;
    url?: string;
    title?: string;
  };
  export type Pagination<T = Record<any, any>> = {
    pageSize?: number;
    current?: number;
  } & T;

  export type AutoRuleForm = {
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
}
