declare namespace API {
  type FileType = 'image' | 'video' | 'audio' | 'dir';

  type File = {
    id: number;
    name: string;
    url: string;
    thumb_url: string;
    type: API.FileType;
    path: string;
  };
}
