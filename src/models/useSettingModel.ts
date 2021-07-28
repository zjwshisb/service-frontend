import React from 'react';
import { getChatSetting } from '@/services';

export default function useSettingModel() {
  const [setting, setSetting] = React.useState<API.AdminChatSetting>();

  const refresh = React.useCallback(() => {
    getChatSetting().then((res) => {
      setSetting(res.data);
    });
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    setting,
    refresh,
  };
}
