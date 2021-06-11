declare namespace API {
  export type Response<T = any> = {
    success: true;
    data: T;
    message?: string;
  };

  export type CurrentUser = {
    username: string;
    id: number;
    avatar: string;
  };

  export type ShortcutReply = {
    content: string;
    id: number;
    count: number;
  };
}
