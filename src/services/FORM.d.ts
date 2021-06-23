declare namespace FORM {
  export type AutoMessageForm = {
    id?: number;
    name: string;
    type: API.MessageType;
    content: string;
    url?: string;
    title?: string;
  };
}
