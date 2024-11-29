import React from 'react';

export default function () {
  const requestPermission = React.useCallback(() => {
    if (window.Notification) {
      if (window.Notification.permission === 'default') {
        window.Notification.requestPermission();
      }
    }
  }, []);

  const notify = React.useCallback(
    (title: string, options: NotificationOptions = {}): Notification | null => {
      if (window.Notification.permission === 'granted') {
        return new Notification(title, options);
      }
      return null;
    },
    [],
  );

  const notifyMessage = React.useCallback(
    (username: string, message: API.Message) => {
      const options: NotificationOptions = {};
      let notice = '';
      if (message.type === 'file') {
        options.body = '[文件]';
        notice = `<${username}>发来了一张图片`;
      }
      if (message.type === 'text') {
        options.body = message.content;
        notice = `<${username}>发来了一条消息`;
      }
      notify(notice, options);
    },
    [notify],
  );

  return {
    notify,
    notifyMessage,
    requestPermission,
  };
}
