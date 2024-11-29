import React from 'react';
import { getChatSetting } from '@/services';

export default function () {
  const [setting, setSetting] = React.useState<API.AdminChatSetting>();

  const fetchSetting = React.useCallback(() => {
    getChatSetting().then((res) => {
      setSetting(res.data);
    });
  }, []);

  return {
    setting,
    fetchSetting,
  };
}
