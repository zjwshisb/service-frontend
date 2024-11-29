export function getMessageTypeLabel(content: string, type: API.MessageType): string {
  switch (type) {
    case 'text': {
      return content;
    }
    case 'file': {
      return '[文件]';
    }
    case 'navigator': {
      return '[导航卡片]';
    }
    default: {
      return '';
    }
  }
}
