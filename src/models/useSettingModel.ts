import React from 'react';
import { getChatSetting } from '@/services';
import { useModel } from '@umijs/max';

export default function useSettingModel() {
  const [setting, setSetting] = React.useState<API.AdminChatSetting>();

  const { initialState } = useModel('@@initialState');

  const refresh = React.useCallback(() => {
    if (initialState?.currentUser) {
      getChatSetting().then((res) => {
        setSetting(res.data);
      });
    }
  }, [initialState]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    setting,
    refresh,
  };
}
