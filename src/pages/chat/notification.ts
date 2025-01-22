export function requestPermission() {
  if (window.Notification) {
    if (window.Notification.permission === 'default') {
      window.Notification.requestPermission();
    }
  }
}

export function notify(title: string, options: NotificationOptions = {}) {
  if (window.Notification.permission === 'granted') {
    return new Notification(title, options);
  }
  return null;
}

export function notifyMessage(username: string, message: API.Message) {
  const options: NotificationOptions = {};
  let notice = '';
  if (message.type === 'image') {
    options.body = '[图片]';
    notice = `<${username}>发来了一张图片`;
  }
  if (message.type === 'text') {
    options.body = message.content;
    notice = `<${username}>发来了一条消息`;
  }
  notify(notice, options);
}
