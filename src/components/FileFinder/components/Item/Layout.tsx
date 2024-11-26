import React from 'react';
import classNames from 'classnames';
import { Dropdown, MenuProps } from 'antd';

const Layout: React.FC<
  React.PropsWithChildren<{
    icon: React.ReactNode;
    className?: string;
    onIconClick?: () => void;
    onNameClick?: () => void;
    onClick?: () => void;
    active?: boolean;
    menus?: MenuProps['items'];
  }>
> = (props) => {
  return (
    <Dropdown
      trigger={['contextMenu']}
      menu={{
        items: props.menus,
      }}
    >
      <div
        onClick={props.onClick}
        className={classNames(
          'w-32 p-2 flex flex-col flex-shrink-0 rounded-lg',
          props.active ? 'hover:bg-gray-300 cursor-pointer' : 'opacity-30',
          props.className,
        )}
      >
        <div className={'w-28 h-28 overflow-hidden'} onClick={props.onIconClick}>
          {props.icon}
        </div>
        <div className={'overflow-hidden py-1 flex items-center'} onClick={props.onNameClick}>
          {props.children}
        </div>
      </div>
    </Dropdown>
  );
};

export default Layout;
