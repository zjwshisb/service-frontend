import React from 'react';
import { getHistorySessions } from '@/services';

export default function () {
  const [visible, setVisible] = React.useState(false);
  const [sessions, setSessions] = React.useState<API.ChatSession[]>([]);

  const show = React.useCallback((id: number) => {
    setVisible(true);
    getHistorySessions(id).then((res) => {
      setSessions(res.data);
    });
  }, []);

  return {
    sessions,
    visible,
    show,
    setVisible,
  };
}
