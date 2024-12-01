declare namespace API {
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
}
