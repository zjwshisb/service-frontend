import React from 'react';
import { getShortcutReplies, storeShortcutReply, destroyShortcutReply } from '@/services/user';

export default function useShortcutReplyModel() {
  const [replies, setReplies] = React.useState<API.ShortcutReply[]>([]);

  const fetchShortcutReplies = React.useCallback(() => {
    getShortcutReplies().then((res) => {
      setReplies(res.data);
    });
  }, []);

  const addShortcutReply = React.useCallback(
    async (text: string) => {
      await storeShortcutReply(text);
      fetchShortcutReplies();
    },
    [fetchShortcutReplies],
  );

  const deleteShortcutReply = React.useCallback(
    async (id: React.ReactText) => {
      await destroyShortcutReply(id);
      fetchShortcutReplies();
    },
    [fetchShortcutReplies],
  );

  return {
    replies,
    fetchShortcutReplies,
    addShortcutReply,
    deleteShortcutReply,
  };
}
