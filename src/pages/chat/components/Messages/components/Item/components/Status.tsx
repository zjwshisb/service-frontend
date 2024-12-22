import React from 'react';
import { Spin, Dropdown } from 'antd';
import { Icon } from '@iconify/react';

const Status: React.FC<{
  isSuccess?: boolean;
  onResend: () => void;
}> = (props) => {
  return React.useMemo(() => {
    return (
      <>
        {props.isSuccess === undefined && <Spin />}
        {props.isSuccess === false && (
          <Dropdown
            menu={{
              items: [
                {
                  label: '重新发送',
                  key: 'resend',
                  onClick() {
                    props.onResend();
                  },
                },
              ],
            }}
          >
            <Icon
              icon={'material-symbols:error'}
              onClick={(e) => {
                e.stopPropagation();
                props.onResend();
              }}
              className={'text-red-400 cursor-pointer text-lg mt-1.5'}
            ></Icon>
          </Dropdown>
        )}
      </>
    );
  }, [props]);
};

export default Status;
