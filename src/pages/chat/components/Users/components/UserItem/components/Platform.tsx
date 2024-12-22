import React from 'react';

const Platform: React.FC<{
  platform: API.Platform;
}> = (props) => {
  const status = React.useMemo(() => {
    switch (props.platform) {
      case 'web':
        return '[电脑网页在线]';
      case 'app':
        return '[手机app在线]';
      case 'weapp':
        return '[微信小程序在线]';
      case 'h5':
        return '[移动端网页在线]';
      default:
        return '[离线]';
    }
  }, [props.platform]);

  return <div className={'text-xs text-gray-500'}>{status}</div>;
};
export default Platform;
