declare namespace API {

  export type Response<T> = {
    success: Boolean,
    data : T,
    message?: string
  }


  export type CurrentUser = {
    username: string;
    id: number
  };

}
