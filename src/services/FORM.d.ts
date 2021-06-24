declare namespace FORM {
  export type AutoMessageForm = {
    id?: number;
    name: string;
    type: API.MessageType;
    content: string;
    url?: string;
    title?: string;
  };
  export type Pagination<T extends Record<any, any>> = {
    pageSize: number;
    current: number;
  } & T;
}
