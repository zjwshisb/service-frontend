declare namespace API {

  export type Response<T = any> = {
    success: true,
    data: T,
    message?: string
  }

  export type CurrentUser = {
    username: string;ue
    id: number
  };

}
